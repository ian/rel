import { andify } from "./util/params"

export async function cypherList(label, opts?) {
  const { order = "id", skip, limit, where } = opts || {}

  const cypherQuery = []

  cypherQuery.push(`MATCH (node:${label})`)

  // @todo - geo
  // if (geo?.boundingBox) {
  //   const { southWest, northEast } = geo.boundingBox

  //   cypherQuery.push(`
  //       WITH node, point({ latitude: ${southWest.lat}, longitude: ${southWest.lng} }) AS southWest, point({ latitude: ${northEast.lat}, longitude: ${northEast.lng} }) AS northEast
  //       `)

  //   cypherWhere.push("node.geo > southWest")
  //   cypherWhere.push("node.geo < northEast")
  // }

  if (where) {
    cypherQuery.push(`WHERE ${andify(where, { prefix: "node." })}`)
  }

  // @todo support multiple returns
  cypherQuery.push(`RETURN node`)

  // order
  if (order) cypherQuery.push(`ORDER BY node.${order}`)

  // pagination
  if (skip) cypherQuery.push(`SKIP ${skip}`)
  if (limit) cypherQuery.push(`LIMIT ${limit}`)

  return this.exec(cypherQuery.join("\n")).then((res) => {
    return res.map((res) => res?.node || null).filter((f) => f)
  })
}
