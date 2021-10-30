import { Graph } from "redisgraph.js"
import {
  Cypher1Response,
  CypherResponse,
  Node,
  NodeRef,
  QueryConfig,
  RawResponse,
} from "./types"

import { cypherCreate } from "./helpers/create"
import { cypherDelete } from "./helpers/delete"
import { cypherFind } from "./helpers/find"
import { cypherFindOrCreate } from "./helpers/findOrCreate"
import { cypherList } from "./helpers/list"
import { cypherMerge } from "./helpers/merge"
import { cypherUpdate } from "./helpers/update"
import { cypherCount } from "./helpers/count"
import {
  cypherClearRelation,
  cypherCreateRelationship,
  cypherDeleteRelationship,
  cypherListRelationship,
} from "./helpers/relationships"

import { beautifyCypher } from "./util/beautify"
import { sanitize } from "./util/sanitize"

const LOGGER = process.env.CYPHER_DEBUG ? console.log : null

export * from "./types"

export function ref(node: Node): NodeRef {
  const { __typename, id } = node
  return { __typename, id }
}

class Client {
  async raw(cypher, opts: QueryConfig = {}, tries = 0): Promise<RawResponse> {
    const logger = opts.logger || LOGGER

    const graph = new Graph(
      "graph",
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
      if (logger) logger(beautifyCypher(cypher), time)

      return {
        records: res._results,
      }
    } catch (err) {
      // if (tries < 2) {
      //   return this.raw(cypher, opts, tries + 1)
      // }

      const time = process.hrtime(startTime)
      console.error(beautifyCypher(cypher), "\n", err, "\n", time)
    } finally {
      graph.close()
    }
  }

  async exec(query, opts: QueryConfig = {}): Promise<CypherResponse> {
    const res = await this.raw(query, opts)

    const recordMapper = (rec) => {
      let res = {}

      rec._header.forEach((varName, i) => {
        const node = rec._values[i]

        if (node?.constructor.name == "Node") {
          const properties = node?.properties
          const mapped = { ...properties }
          if (node.label) mapped.__typename = node.label
          res[varName] = sanitize(mapped)
        } else if (node?.constructor.name == "Array") {
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

  async exec1(query, opts: QueryConfig = {}): Promise<Cypher1Response> {
    const res = await this.exec(query, opts)
    return res && res[0]
  }

  deleteAll = () => this.exec("MATCH (n)-[r]-() DETACH DELETE n,r;")

  find = cypherFind.bind(this)
  list = cypherList.bind(this)
  count = cypherCount.bind(this)
  create = cypherCreate.bind(this)
  merge = cypherMerge.bind(this)
  update = cypherUpdate.bind(this)
  findOrCreate = cypherFindOrCreate.bind(this)
  delete = cypherDelete.bind(this)

  listRelationship = cypherListRelationship.bind(this)
  createRelationship = cypherCreateRelationship.bind(this)
  clearRelationship = cypherClearRelation.bind(this)
  deleteRelationship = cypherDeleteRelationship.bind(this)
}

export default new Client()
