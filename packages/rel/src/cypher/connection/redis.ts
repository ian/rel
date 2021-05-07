import { Graph } from "redisgraph.js"
import { Cypher1Response, CypherResponse } from "../../types"

import { Geo } from "../../util/geo"
import Events from "../../server/events"
import ConnectionInstance from "./instance"
import { beautifyCypher } from "../util/beautify"

export default class RedisGraphConnection extends ConnectionInstance {
  config: {
    host: string
    username: string
    password: string
    port: number
  } = null

  logger

  constructor(props) {
    super()

    if (!props)
      throw new Error(
        "Invalid DB Credentials, please make sure to set DB config"
      )

    const { logger = Events.cypher, ...config } = props

    this.config = config
    if (logger) this.logger = logger
  }

  async raw(cypher): Promise<any> {
    if (!this.config) throw new Error("Missing Redis connection config")

    let graph = new Graph("graph", this.config.host, this.config.port, {})

    const startTime = process.hrtime()

    try {
      // const res = await session.run(cypher)
      const res = await graph.query(cypher)
      const time = process.hrtime(startTime)
      this.logger && this.logger(beautifyCypher(cypher), time)

      return {
        records: res._results,
      }
    } catch (err) {
      console.error(beautifyCypher(cypher), "\n", err)
    } finally {
      graph.close()
    }
  }

  async exec(query): Promise<CypherResponse> {
    const res = await this.raw(query)

    const recordMapper = (rec) => {
      let res = {}

      rec._header.forEach((varName, i) => {
        const node = rec._values[i]
        const properties = node?.properties || {}
        const mapped = { ...properties }
        if (node.label) mapped.__typename = node.label

        res[varName] = sanitize(mapped)
      })

      return res
    }

    return res.records.map(recordMapper)
  }

  async exec1(query): Promise<Cypher1Response> {
    const res = await this.exec(query)
    return res[0]
  }
}

function sanitize(maybeObject) {
  switch (true) {
    case maybeObject === undefined:
      return null
    // case isInt(maybeObject):
    //   return parseInt(maybeObject.toString())
    case typeof maybeObject === "object":
      if (maybeObject.latitude && maybeObject.latitude) {
        return {
          lat: maybeObject.latitude,
          lng: maybeObject.longitude,
        }
      }
      return Object.keys(maybeObject).reduce((acc, key) => {
        acc[key] = sanitize(maybeObject[key])
        return acc
      }, {})
    default:
      return maybeObject
  }
}
