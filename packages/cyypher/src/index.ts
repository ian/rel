import { Graph } from 'redisgraph.js'
import { cypherCreate } from './helpers/create.js'
import { cypherDelete } from './helpers/delete.js'
import { cypherDeleteBy } from './helpers/deleteBy.js'
import { cypherFind } from './helpers/find.js'
import { cypherFindOrCreate } from './helpers/findOrCreate.js'
import { cypherList } from './helpers/list.js'
import { cypherMerge } from './helpers/merge.js'
import { cypherUpdate } from './helpers/update.js'
import { cypherUpdateBy } from './helpers/updateBy.js'
import { cypherCount } from './helpers/count.js'

import {
  cypherClearRelation,
  cypherCreateRelationship,
  cypherDeleteRelationship,
  cypherListRelationship,
} from './helpers/relationships.js'

import { beautifyCypher } from './util/beautify.js'
import { sanitize } from './util/sanitize.js'

import logger from './logger.js'

export function ref(node) {
  const { __typename, id } = node
  return { __typename, id }
}

class Client {
  constructor() {
    this.find = cypherFind.bind(this)
    this.list = cypherList.bind(this)
    this.count = cypherCount.bind(this)
    this.create = cypherCreate.bind(this)
    this.merge = cypherMerge.bind(this)
    this.update = cypherUpdate.bind(this)
    this.updateBy = cypherUpdateBy.bind(this)
    this.findOrCreate = cypherFindOrCreate.bind(this)
    this.delete = cypherDelete.bind(this)
    this.deleteBy = cypherDeleteBy.bind(this)

    this.listRelationship = cypherListRelationship.bind(this)
    this.createRelationship = cypherCreateRelationship.bind(this)
    this.clearRelationship = cypherClearRelation.bind(this)
    this.deleteRelationship = cypherDeleteRelationship.bind(this)
  }

  async raw(cypher, opts = {}, tries = 0) {
    const graph = new Graph(
      'graph',
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      {
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      }
    )

    const startTime = process.hrtime()

    try {
      const res = await graph.query(cypher)
      const time = process.hrtime(startTime)
      if (logger)
        logger.debug(
          beautifyCypher(cypher) +
            ' [' +
            (time[0] * 1000000000 + time[1]) / 1000000 +
            'ms]',
          'CYPHER'
        )

      return {
        records: res._results,
      }
    } catch (err) {
      // if (tries < 2) {
      //   return this.raw(cypher, opts, tries + 1)
      // }

      const time = process.hrtime(startTime)
      logger.error(
        beautifyCypher(cypher) +
          '\n' +
          err +
          ' [' +
          (time[0] * 1000000000 + time[1]) / 1000000 +
          'ms]',
        'CYPHER'
      )
      return {
        records: [],
      }
    } finally {
      graph.close()
    }
  }

  async exec(query, opts = {}) {
    const res = await this.raw(query, opts)

    const recordMapper = (rec) => {
      const res = {}

      rec._header.forEach((varName, i) => {
        const node = rec._values[i]

        if (node?.constructor.name === 'Node') {
          const properties = node?.properties
          const mapped = { ...properties }
          if (node.label) mapped.__typename = node.label
          res[varName] = sanitize(mapped)
        } else if (node?.constructor.name === 'Array') {
          res[varName] = node.map((n) => {
            const mapped = { ...n.properties }
            if (n.label) mapped.__typename = n.label
            return sanitize(mapped)
          })
        } else {
          res[varName] = node
        }
      })

      return res
    }

    return res?.records?.map(recordMapper)
  }

  async exec1(query, opts) {
    const res = await this.exec(query, opts)
    return res && res[0]
  }

  deleteAll() {
    const query = 'MATCH (n) DETACH DELETE n'
    logger.debug(query, 'CYPHER')
    return this.exec(query)
  }
}

export default new Client()
