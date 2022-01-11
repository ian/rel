import {
  buildModelTableMap,
  getFieldTransformations,
  NoDataError
} from '@graphback/core'
import { v4 as uuid } from 'uuid'
import logger from './logger.js'
import { buildQuery } from './queryBuilder.js'
import cypher from './cypher/src/index.js'
import RedisStreamHelper from 'redis-stream-helper'
const { createStreamGroup, addStreamData } = RedisStreamHelper(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
)

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

  async create (data, selectedFields) {
    this.fieldTransformMap.onCreateFieldTransform.forEach(f => {
      data[f.fieldName] = f.transform(f.fieldName)
    })

    data.id = uuid()

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
    const err = `Cannot create ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async update (data, selectedFields) {
    if (!data.id) {
      const err = `Cannot update ${this.collectionName} - missing ID field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    const id = data.id

    this.fieldTransformMap.onUpdateFieldTransform.forEach(f => {
      data[f.fieldName] = f.transform(f.fieldName)
    })
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
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async updateBy (args, selectedFields) {
    const filterQuery = buildQuery(args?.filter)
    this.fieldTransformMap.onUpdateFieldTransform.forEach(f => {
      args.input[f.fieldName] = f.transform(f.fieldName)
    })
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
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async delete (data, selectedFields) {
    if (!data.id) {
      const err = `Cannot delete ${this.collectionName} - missing ID field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
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
      return result
    }
    const err = `Cannot delete ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async deleteBy (args, selectedFields) {
    const filterQuery = buildQuery(args?.filter)
    const result = await cypher.deleteBy(
      this.collectionName,
      filterQuery,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:delete_by`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, result)
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
        order: args?.orderBy
          ? args?.orderBy?.field + ' ' + (args?.orderBy?.order || 'asc')
          : undefined,
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
}
