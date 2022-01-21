import { NoDataError } from '@graphback/core'
import { v4 as uuid, v5 } from 'uuid'
import logger from './logger.js'
import { buildQuery } from './queryBuilder.js'
import cypher from 'cyypher'
import RedisStreamHelper from 'redis-stream-helper'
import Redis from 'ioredis'
import _ from 'lodash'
const { createStreamGroup, addStreamData } = RedisStreamHelper(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
)
const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)
const UNIQUE_NAMESPACE = '9003d956-f170-47c6-b3fb-c8af0e9ada83'
/**
 * Graphback provider that connnects to the RedisGraph database
 */
export class RedisGraphProvider {
  constructor(model) {
    this.db = cypher
    this.model = model
    this.collectionName = model.graphqlType.name
    this.computedTemplates = {}
    this.model.computedFields.forEach((computedField) => {
      this.computedTemplates[computedField.name] = {
        template: _.template(`<%= ${computedField.template} %>`),
        type: computedField.type,
      }
    })
  }

  addComputedValues(data) {
    Object.keys(this.computedTemplates).forEach((k) => {
      let value = this.computedTemplates[k].template(data)

      switch (this.computedTemplates[k].type) {
        case 'String':
          break
        case 'Boolean':
          value = Boolean(value)
          break
        case 'Int':
        case 'Float':
          value = Number(value)
          break
        default:
          try {
            value = JSON.parse(value)
          } catch {
            // do nothing, assume the existing value
          }
      }

      data[k] = value
    })
    return data
  }

  addDefaultValues(data) {
    this.model.defaultFields.forEach((defaultField) => {
      if (
        data[defaultField.name] === null ||
        typeof data[defaultField.name] === 'undefined'
      ) {
        data[defaultField.name] = defaultField.default
      }
    })
    return data
  }

  createProjection(data, selectedFields = []) {
    return selectedFields.reduce((prev, cur) => {
      prev[cur] = data[cur]
      return prev
    }, {})
  }

  shouldCompute(selectedFields = []) {
    return Object.keys(this.computedTemplates).some((i) =>
      selectedFields.includes(i)
    )
  }

  async create(data, selectedFields = []) {
    data.createdAt = new Date().getTime()
    data._id = uuid()

    data = this.addDefaultValues(data)

    if (this.model.uniqueFields.length > 0) {
      const __unique = await this.checkUniqueness('Create', data)
      data.__unique = __unique
    }

    let result = await cypher.create(this.collectionName, data)
    if (result) {
      if (this.shouldCompute(selectedFields)) {
        result = this.addComputedValues(result)
      }
      if (selectedFields.length > 0) {
        result = this.createProjection(result, selectedFields)
      }
      const streamKey = `rel:${this.collectionName}:create`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, data)
      return result
    }
    const err = `Cannot create ${this.collectionName}.${
      this.model.uniqueFields.length > 0
        ? ' UNIQUE constraint might be violated.'
        : ''
    }`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async update(data, selectedFields = []) {
    if (!data._id) {
      const err = `Cannot update ${this.collectionName} - missing _id field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    const _id = data._id

    let entity
    let shouldVerifyUniqueness = false
    let uniqueKey

    data.updatedAt = new Date().getTime()

    data = this.addDefaultValues(data)

    if (this.model.uniqueFields.length > 0) {
      entity = await cypher.find(
        this.collectionName,
        { _id: data._id },
        this.model.uniqueFields
      )
      if (entity) {
        this.model.uniqueFields.forEach((f) => {
          if (data[f] && data[f] !== entity[f]) {
            shouldVerifyUniqueness = true
            entity[f] = data[f]
          }
        })
        entity._id = _id
        if (shouldVerifyUniqueness) {
          uniqueKey = await this.checkUniqueness('Update', entity)
        }
      }
      data.__unique = uniqueKey
    }

    let result = await cypher.update(this.collectionName, _id, data)
    if (result) {
      if (this.shouldCompute(selectedFields)) {
        result = this.addComputedValues(result)
      }
      if (selectedFields.length > 0) {
        result = this.createProjection(result, selectedFields)
      }
      const streamKey = `rel:${this.collectionName}:update`
      await createStreamGroup(streamKey)
      data._id = _id
      await addStreamData(streamKey, data)
      return result
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async updateBy(args, selectedFields = []) {
    const filterQuery = buildQuery(args?.filter)
    const data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery,
      },
      ['_id']
    )
    const items = []
    const updatedAt = new Date().getTime()
    for (let i = 0; i < data.length; i++) {
      const obj = args.input
      obj._id = data[i]._id
      obj.updatedAt = updatedAt
      items.push(await this.update(obj, selectedFields))
    }
    if (items.length > 0) {
      return items
    }
    const err = `Cannot update ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async delete(data, selectedFields = []) {
    if (!data._id) {
      const err = `Cannot delete ${this.collectionName} - missing _id field`
      logger.error(err, 'RedisGraphProvider')
      throw new NoDataError(err)
    }

    let result = await cypher.delete(
      this.collectionName,
      data._id,
      selectedFields
    )
    if (result) {
      const streamKey = `rel:${this.collectionName}:delete`
      await createStreamGroup(streamKey)
      await addStreamData(streamKey, { _id: data.id })
      return result
    }
    const err = `Cannot delete ${this.collectionName}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async deleteBy(args, selectedFields = []) {
    const filterQuery = buildQuery(args?.filter)
    const data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery,
      },
      ['_id']
    )
    const items = []
    for (let i = 0; i < data.length; i++) {
      const obj = {
        _id: data[i]._id,
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

  async findOne(filter, selectedFields = []) {
    let data = await cypher.find(this.collectionName, filter)

    if (data) {
      if (this.shouldCompute(selectedFields)) {
        result = this.addComputedValues(result)
      }
      if (selectedFields.length > 0) {
        result = this.createProjection(result, selectedFields)
      }
      return data
    }

    const err = `Cannot find a result for ${
      this.collectionName
    } with filter: ${JSON.stringify(filter)}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async findBy(args, selectedFields = [], fieldArgs) {
    const filterQuery = buildQuery(args?.filter)
    if (args?.page?.offset && args.page.offset < 0) {
      const err =
        'Invalid offset value. Please use an offset of greater than or equal to 0 in queries'
      logger.error(err, 'RedisGraphProvider')
      throw new Error(err)
    }

    if (args?.page?.limit && args.page.limit < 1) {
      const err =
        'Invalid limit value. Please use a limit of greater than or equal to 1 in queries'
      logger.error(err, 'RedisGraphProvider')
      throw new Error(err)
    }
    const shouldCompute = this.shouldCompute(selectedFields)
    let data = await cypher.list(
      this.collectionName,
      {
        where: filterQuery,
        order: args?.orderBy,
        skip: args?.page?.offset,
        limit: args?.page?.limit,
      },
      shouldCompute ? [] : selectedFields,
      fieldArgs
    )

    if (data) {
      if (shouldCompute) {
        for (let i = 0; i < data.length; i++) {
          data[i] = this.addComputedValues(data[i])
          data[i] = this.createProjection(data[i], selectedFields)
        }
      }
      return data
    }

    const err = `Cannot find all results for ${
      this.collectionName
    } with filter: ${JSON.stringify(args?.filter)}`

    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async count(filter) {
    return cypher.count(this.collectionName, {
      where: filter ? buildQuery(filter) : null,
    })
  }

  async batchRead(relationField, ids, filter, selectedFields, fieldArgs) {
    filter = filter || {}
    filter[relationField] = { in: ids }
    const filterQuery = buildQuery(filter)
    const dbResult = await cypher.list(
      this.collectionName,
      {
        where: filterQuery,
      },
      selectedFields,
      fieldArgs
    )

    if (dbResult) {
      const resultsById = ids.map((id) =>
        dbResult.filter((data) => {
          return data[relationField].toString() === id.toString()
        })
      )

      return resultsById
    }

    const err = `No results for ${this.collectionName} and id: ${JSON.stringify(
      ids
    )}`
    logger.error(err, 'RedisGraphProvider')
    throw new NoDataError(err)
  }

  async initializeUniqueIndex() {
    const uniqueDefRedisKey = `rel:unique:definition:${this.collectionName}`
    const uniqueKeyDefinition = await redis.get(uniqueDefRedisKey)
    const addUniqueValues = async () => {
      if (this.model.uniqueFields.length > 0) {
        await redis.set(
          uniqueDefRedisKey,
          JSON.stringify({
            fields: this.model.uniqueFields,
            initialized: false,
          })
        )
        const items = await cypher.list(
          this.collectionName,
          {},
          this.model.uniqueFields
        )
        for (let i = 0; i < items.length; i++) {
          const __unique = this.generateUniqueValue(items[i])
          await cypher.update(this.collectionName, items[i]._id, { __unique })
        }
        await redis.set(
          uniqueDefRedisKey,
          JSON.stringify({
            fields: this.model.uniqueFields,
            initialized: true,
          })
        )
      } else {
        await redis.del(uniqueDefRedisKey)
      }
    }
    if (uniqueKeyDefinition) {
      const uniqueKeyInfo = JSON.parse(uniqueKeyDefinition)
      if (
        JSON.stringify(uniqueKeyInfo.fields.sort()) ===
        JSON.stringify(this.model.uniqueFields.sort())
      ) {
        if (!uniqueKeyInfo.initialized) {
          await addUniqueValues()
        }
      } else {
        await addUniqueValues()
      }
    } else {
      await addUniqueValues()
    }
  }

  async checkUniqueness(mutationName, data) {
    let uniqueKey
    if (this.model.uniqueFields.length > 0) {
      uniqueKey = this.generateUniqueValue(data)
      const uniqueValue = await cypher.list(
        this.collectionName,
        {
          where: { __unique: { eq: ['=', `"${uniqueKey}"`] } },
        },
        ['_id', '__unique']
      )
      if (uniqueValue.__unique && data._id !== uniqueValue._id) {
        throw new Error(
          `The ${mutationName} mutation would violate ${this.collectionName} UNIQUE constraint`
        )
      }
    }
    return uniqueKey
  }

  generateUniqueValue(data) {
    return v5(
      this.model.uniqueFields.reduce(
        (previous, current) => previous + current + ':' + data[current],
        ''
      ),
      UNIQUE_NAMESPACE
    )
  }
}
