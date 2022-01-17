import {
  buildModelTableMap,
  getFieldTransformations,
  NoDataError
} from '@graphback/core'
import { v4 as uuid, v5 } from 'uuid'
import logger from './logger.js'
import { buildQuery } from './queryBuilder.js'
import cypher from './cypher/src/index.js'
import RedisStreamHelper from 'redis-stream-helper'
import Redis from "ioredis"
const { createStreamGroup, addStreamData } = RedisStreamHelper(
  process.env.REDIS_PORT, process.env.REDIS_HOST
)
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const UNIQUE_NAMESPACE = '9003d956-f170-47c6-b3fb-c8af0e9ada83';
/**
 * Graphback provider that connnects to the RedisGraph database
 */
export class RedisGraphProvider {
  constructor (model) {
    this.db = cypher
    this.tableMap = buildModelTableMap(model.graphqlType)
    this.collectionName = this.tableMap.tableName
    this.fieldTransformMap = getFieldTransformations(model.graphqlType)
  }

  async create (data, selectedFields, uniqueFields = []) {
    this.fieldTransformMap.onCreateFieldTransform.forEach(f => {
      data[f.fieldName] = f.transform(f.fieldName)
    })

    data.__id = uuid()

    if(uniqueFields.length > 0) {
      const __unique = await this.checkUniqueness("Create", data, uniqueFields)
      data.__unique = __unique
    }

    const result = await cypher.create(
      this.collectionName,
      data,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:create`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, data)
      return result
    }
    const err = `Cannot create ${this.collectionName}.${uniqueFields.length > 0 ? " UNIQUE constraint might be violated." : ""}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async update (data, selectedFields, uniqueFields = []) {
    if (!data.__id) {
      const err = `Cannot update ${this.collectionName} - missing __id field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    const __id = data.__id

    let entity
    let shouldVerifyUniqueness = false
    let uniqueKey

    this.fieldTransformMap.onUpdateFieldTransform.forEach(f => {
      data[f.fieldName] = f.transform(f.fieldName)
    })

    if(uniqueFields.length > 0) {
      entity = await cypher.find(this.collectionName, { __id: data.__id }, uniqueFields)
      if(entity) {
        uniqueFields.forEach(f => {
          if(data[f] && data[f] !== entity[f]) {
            shouldVerifyUniqueness = true
            entity[f] = data[f]
          }
        })
        entity.__id = __id
        if(shouldVerifyUniqueness) {
          uniqueKey = await this.checkUniqueness("Update", entity, uniqueFields)
        }
      }
      data.__unique = uniqueKey
    }

    const result = await cypher.update(
      this.collectionName,
      __id,
      data,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:update`
      await createStreamGroup(streamKey)
      data.__id = __id
      await addStreamData(streamKey, data)
      return result
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async updateBy (args, selectedFields, uniqueFields = []) {
    const filterQuery = buildQuery(args?.filter)
    const data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery
      },
      ["__id"]
    )
    const items = []
    for(let i = 0; i < data.length; i++) {
      const obj = args.input
      obj.__id = data[i].__id
      items.push(await this.update(obj, selectedFields, uniqueFields))
    }
    if(items.length > 0) {
      return items
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async delete (data, selectedFields) {
    if (!data.__id) {
      const err = `Cannot delete ${this.collectionName} - missing __id field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    const result = await cypher.delete(
      this.collectionName,
      data.__id,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:delete`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, { __id: data.id })
      return result
    }
    const err = `Cannot delete ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async deleteBy (args, selectedFields) {
    const filterQuery = buildQuery(args?.filter)
    const data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery
      },
      ["__id"]
    )
    const items = []
    for(let i = 0; i < data.length; i++) {
      const obj = {
        __id: data[i].__id
      }
      items.push(await this.delete(obj, selectedFields))
    }
    if (items.length > 0) {
      return items
    }
    const err = `Cannot delete ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async findOne (filter, selectedFields) {
    const data = await cypher.find(this.collectionName, filter, selectedFields)

    if (data) {
      return data
    }

    const err = `Cannot find a result for ${
        this.collectionName
      } with filter: ${JSON.stringify(filter)}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async findBy (args, selectedFields, fieldArgs) {
    const filterQuery = buildQuery(args?.filter)
    if (args?.page?.offset && args.page.offset < 0) {
      const err = 'Invalid offset value. Please use an offset of greater than or equal to 0 in queries'
      logger.error(err, 'RedisGraphProvider')
      throw new Error(err)
    }

    if (args?.page?.limit && args.page.limit < 1) {
      const err = 'Invalid limit value. Please use a limit of greater than or equal to 1 in queries'
      logger.error(err, 'RedisGraphProvider')
      throw new Error(err)
    }
    const data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery,
        order: args?.orderBy,
        skip: args?.page?.offset,
        limit: args?.page?.limit
      },
      selectedFields,
      fieldArgs
    )

    if (data) {
      return data
    }

    const err = `Cannot find all results for ${
        this.collectionName
      } with filter: ${JSON.stringify(args?.filter)}`

    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async count (filter) {
    return cypher.count(this.collectionName, {
      where: filter ? buildQuery(filter) : null
    })
  }

  async batchRead (relationField, ids, filter, selectedFields, fieldArgs) {
    filter = filter || {}
    filter[relationField] = { in: ids }
    const filterQuery = buildQuery(filter)
    const dbResult = await cypher.list(
      this.collectionName,
      {
        where: filterQuery
      },
      selectedFields,
      fieldArgs
    )

    if (dbResult) {
      const resultsById = ids.map(id =>
        dbResult.filter(data => {
          return data[relationField].toString() === id.toString()
        })
      )

      return resultsById
    }

    const err = `No results for ${this.collectionName} and id: ${JSON.stringify(ids)}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async initializeUniqueIndex(uniqueFields = []) {
    const uniqueDefRedisKey = `rel:unique:definition:${this.collectionName}`
    const uniqueKeyDefinition = await redis.get(uniqueDefRedisKey)
    const addUniqueValues = async () => {
      if(uniqueFields.length > 0) {
        await redis.set(uniqueDefRedisKey, JSON.stringify({
          fields: uniqueFields,
          initialized: false
        }))
        const items = await cypher.list(
          this.collectionName,
          {},
          uniqueFields
        )
        for(let i = 0; i < items.length; i++) {
          const __unique = this.generateUniqueValue(items[i], uniqueFields)
          await cypher.update(
            this.collectionName,
            items[i].__id,
            {__unique}
          )
        }
        await redis.set(uniqueDefRedisKey, JSON.stringify({
          fields: uniqueFields,
          initialized: true
        }))
      } else {
        await redis.del(uniqueDefRedisKey)
      }
    }
    if(uniqueKeyDefinition) {
      const uniqueKeyInfo = JSON.parse(uniqueKeyDefinition)
      if(JSON.stringify(uniqueKeyInfo.fields) === JSON.stringify(uniqueFields)) {
        if(!uniqueKeyInfo.initialized) {
          await addUniqueValues()
        }
      } else {
        await addUniqueValues()
      }
    } else {
      await addUniqueValues()
    }
  }

  async checkUniqueness(mutationName, data, uniqueFields = []) {
    let uniqueKey
    if(uniqueFields.length > 0) {
      uniqueKey = this.generateUniqueValue(data, uniqueFields)
      const uniqueValue = await cypher.list(
        this.collectionName,
        {
          where: {__unique: {eq: ["=", `"${uniqueKey}"`]}},
        },
        ["__id", "__unique"],
      )
      if(uniqueValue.__unique && data.__id !== uniqueValue.__id) {
        throw new Error(`The ${mutationName} mutation would violate ${this.collectionName} UNIQUE constraint`)
      }
    }
    return uniqueKey
  }
  
  generateUniqueValue(data, fields) {
    return v5(fields.reduce((previous, current) => previous + current + ":" + data[current], ""), UNIQUE_NAMESPACE)
  }
}
