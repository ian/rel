import { URL } from 'url'
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

function parseConnection(conn: ConnectionOpts) {
  if (typeof conn === 'string') {
    const url = new URL(conn)
    return {
      host: url.hostname,
      port: url.port,
      auth: {
        username: url.username,
        password: url.password,
      },
    }
  } else {
    return conn
  }
}

type Connection = {
  host: string
  port: string
  auth?: {
    username: string
    password: string
  }
}

type ConnectionOpts = string | Connection
export class Client {
  connection = null

  find = cypherFind.bind(this)
  list = cypherList.bind(this)
  count = cypherCount.bind(this)
  create = cypherCreate.bind(this)
  merge = cypherMerge.bind(this)
  update = cypherUpdate.bind(this)
  updateBy = cypherUpdateBy.bind(this)
  findOrCreate = cypherFindOrCreate.bind(this)
  delete = cypherDelete.bind(this)
  deleteBy = cypherDeleteBy.bind(this)

  listRelationship = cypherListRelationship.bind(this)
  createRelationship = cypherCreateRelationship.bind(this)
  clearRelationship = cypherClearRelation.bind(this)
  deleteRelationship = cypherDeleteRelationship.bind(this)

  constructor(conn: ConnectionOpts) {
    this.connection = parseConnection(conn)
  }

  async raw(cypher, opts = {}, tries = 0) {
    const graph = new Graph(
      'graph',
      this.connection.host,
      this.connection.port,
      this.connection.auth
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

export default new Client(
  process.env.REDIS_URL || {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    auth: {
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  }
)
