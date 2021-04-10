import neo4j, { Driver, Result } from "neo4j-driver"
import { isInt } from "neo4j-driver/lib/integer.js"

import { Cypher1Response, CypherResponse } from "../../types"

import { Geo } from "../../util/geo"
import Events from "../../server/events"
import ConnectionInstance from "./instance"
import { beautifyCypher } from "../util/beautify"

export default class Neo4jConnection extends ConnectionInstance {
  config: null
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

  async raw(cypher): Promise<Result> {
    const driver = neo4j.driver(
      // @ts-ignore
      this.config?.url,
      // @ts-ignore
      neo4j.auth.basic(this.config.username, this.config.password)
    )

    const session = driver.session()
    const startTime = process.hrtime()

    try {
      const res = await session.run(cypher)
      const time = process.hrtime(startTime)
      this.logger(beautifyCypher(cypher), time)
      return res
    } catch (err) {
      console.error(beautifyCypher(cypher), "\n", err)
    } finally {
      await session.close()
      await driver.close()
    }
  }

  async exec(query): Promise<CypherResponse> {
    const res = await this.raw(query)

    const sanitize = (maybeObject) => {
      switch (true) {
        case maybeObject === undefined:
          return null
        case isInt(maybeObject):
          return parseInt(maybeObject.toString())
        case maybeObject.constructor.name === "Point":
          return new Geo({
            lat: maybeObject.y,
            lng: maybeObject.x,
          })
        case typeof maybeObject === "object":
          return Object.keys(maybeObject).reduce((acc, key) => {
            acc[key] = sanitize(maybeObject[key])
            return acc
          }, {})
        default:
          return maybeObject
      }
    }

    const recordMapper = (rec) => {
      let res = {}
      rec.keys.forEach((key) => {
        const node = rec.get(key)

        if (isInt(node)) {
          res[key] = node.toNumber()
        } else {
          const labels = node?.labels || []
          const properties = node?.properties || {}

          let mapped = { ...properties }
          if (labels) mapped.__typename = labels[0]

          res[key] = sanitize(mapped)
        }
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
