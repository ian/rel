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

    data.id = uuid()

    await this.checkUniqueness("Create", data, uniqueFields)

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
    await this.removeUniqueValue(data, uniqueFields)
    const err = `Cannot create ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async update (data, selectedFields, uniqueFields = []) {
    if (!data.id) {
      const err = `Cannot update ${this.collectionName} - missing ID field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    const id = data.id

    let entity
    let shouldVerifyUniqueness = false

    this.fieldTransformMap.onUpdateFieldTransform.forEach(f => {
      data[f.fieldName] = f.transform(f.fieldName)
    })

    if(uniqueFields.length > 0) {
      entity = await cypher.find(this.collectionName, { id: data.id }, uniqueFields)
      if(entity) {
        uniqueFields.forEach(f => {
          if(data[f] && data[f] !== entity[f]) {
            shouldVerifyUniqueness = true
            entity[f] = data[f]
          }
        })
        if(shouldVerifyUniqueness) {
          await this.checkUniqueness("Update", entity, uniqueFields)
          await this.generateUniqueValue(entity, uniqueFields)
        }
      }
    }

    const result = await cypher.update(
      this.collectionName,
      id,
      data,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:update`
      await createStreamGroup(streamKey)
      data.id = id
      await addStreamData(streamKey, data)
      return result
    }
    if(shouldVerifyUniqueness) {
      await this.removeUniqueValue(entity, uniqueFields)
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async updateBy (args, selectedFields, uniqueFields = []) {
    const filterQuery = buildQuery(args?.filter)
    this.fieldTransformMap.onUpdateFieldTransform.forEach(f => {
      args.input[f.fieldName] = f.transform(f.fieldName)
    })
    const uniqueValues = []
    if(uniqueFields.length > 0) {
      const data = await cypher.list(
        this.collectionName,
        {
          where: filterQuery
        },
        uniqueFields
      )
      for(let i = 0; i < data.length; i++) {
        let shouldVerifyUniqueness = false
        let entity = {}
        const item = data[i]
        uniqueFields.forEach(f => {
          if(item[f] && item[f] !== args.input[f]) {
            shouldVerifyUniqueness = true
            entity[f] = args.input[f]
          }
        })
        if(shouldVerifyUniqueness) {
          await this.checkUniqueness("UpdateBy", entity, uniqueFields)
          await this.generateUniqueValue(entity, uniqueFields)
          uniqueValues.push(entity)
        }
      }
    }
    const result = await cypher.updateBy(
      this.collectionName,
      filterQuery,
      args.input,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:update_by`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, result)
      return result
    }
    if(uniqueFields.length > 0) {
      for(let i = 0; i < uniqueValues.length; i++) {
        await this.removeUniqueValue(uniqueValues[i], uniqueFields)
      }
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async delete (data, selectedFields, uniqueFields = []) {
    if (!data.id) {
      const err = `Cannot delete ${this.collectionName} - missing ID field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    let entity

    if(uniqueFields.length > 0) {
      entity = await cypher.find(this.collectionName, { id: data.id }, uniqueFields)
    }

    const result = await cypher.delete(
      this.collectionName,
      data.id,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:delete`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, { id: data.id })
      await this.removeUniqueValue(entity, uniqueFields)
      return result
    }
    const err = `Cannot delete ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async deleteBy (args, selectedFields, uniqueFields = []) {
    const filterQuery = buildQuery(args?.filter)
    const _selectedFields = uniqueFields.length > 0 ? selectedFields.concat(uniqueFields).filter((item, pos) => c.indexOf(item) === pos) : selectedFields
    const result = await cypher.deleteBy(
      this.collectionName,
      filterQuery,
      _selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:delete_by`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, result)
      if(uniqueFields.length > 0) {
        for(let i = 0; i < result.length; i++) {
          await this.removeUniqueValue(result[i], uniqueFields)
          Object.keys(result[i]).forEach(k => {
            if(!selectedFields.includes(k)) {
              delete result[i][k]
            }
          })
        }
      }
      return result
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
          const uniqueValue = this.generateUniqueValue(items[i], uniqueFields)
          await redis.set(`rel:unique:${this.collectionName}:${v5(uniqueValue, UNIQUE_NAMESPACE)}`, "1")
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
        const uniqueKeys = await redis.keys(`rel:unique:${this.collectionName}*`)
        if(uniqueKeys.length > 0) {
          await redis.del(...uniqueKeys)
        }
        await addUniqueValues()
      }
    } else {
      await addUniqueValues()
    }
  }

  async checkUniqueness(mutationName, data, uniqueFields = []) {
    if(uniqueFields.length > 0) {
      const key = `rel:unique:${this.collectionName}:${v5(this.generateUniqueValue(data, uniqueFields),UNIQUE_NAMESPACE)}`
      const uniqueValue = await redis.get(key)
      if(uniqueValue) {
        throw new Error(`The ${mutationName} mutation would violate ${this.collectionName} UNIQUE constraint`)
      } else {
        await redis.set(key, "1")
      }
    }
  }

  async removeUniqueValue(data, uniqueFields) {
    if(uniqueFields.length > 0) {
      const key = `rel:unique:${this.collectionName}:${v5(this.generateUniqueValue(data, uniqueFields),UNIQUE_NAMESPACE)}`
      await redis.del(key)
    }
  }

  generateUniqueValue(data, fields) {
    return fields.reduce((previous, current) => previous + current + ":" + data[current], "")
  }
}
