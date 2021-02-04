import { isInt } from "neo4j-driver/lib/integer.js"
import { Result } from "neo4j-driver"
import boxen from "boxen"

import driver from "../connection"
import { Geo } from "../../lib/google"

type Cypher1Response = {
  [key: string]: any
}

type CypherResponse = Cypher1Response[]

export async function cypherRaw(query): Promise<Result> {
  function beautifyCypher(query) {
    return query
      .split("\n")
      .map((s) => s.trim())
      .join("\n")
  }

  if (process.env.NEO4J_DEBUG === "true") {
    console.log(
      boxen(beautifyCypher(query), { dimBorder: true, padding: 1, margin: 1 })
    )
  }

  const session = driver.session()
  return session.run(beautifyCypher(query))
}

export async function cypher(query): Promise<CypherResponse> {
  const res = await cypherRaw(query)

  const sanitize = (maybeObject) => {
    switch (true) {
      case maybeObject === undefined:
        return null
      case isInt(maybeObject):
        return maybeObject.toString()
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

export async function cypher1(query): Promise<Cypher1Response> {
  const res = await cypher(query)
  return res[0]
}

export * from "./node"
export * from "./relationship"
