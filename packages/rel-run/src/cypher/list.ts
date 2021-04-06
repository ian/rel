export async function cypherList(label, opts?) {
  const { geo, order = "id", filter, skip, limit, where } = opts || {}

  const cypherWhere = []
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

  // filter
  // if (filter) {
  //   Object.keys(filter).map((key) => {
  //     const val = filter[key]
  //     cypherWhere.push(`node.${key} = ${coerce(val)}`)
  //   })
  // }

  // @todo - where
  if (where) {
    cypherQuery.push(`WHERE ${where.join(" AND ")}`)
  }

  // @todo support multiple returns
  cypherQuery.push(`RETURN node`)

  // order
  if (order) cypherQuery.push(`ORDER BY node.${order}`)

  // pagination
  if (skip) cypherQuery.push(`SKIP ${skip}`)
  if (limit) cypherQuery.push(`LIMIT ${limit}`)

  // return cypherQuery.join("\n")
  return this.exec(cypherQuery.join("\n")).then((res) => {
    return res.map((res) => res?.node || null).filter((f) => f)
  })

  // return cypher1(`MATCH (n:${label} {id: "${id}"}) RETURN n;`).then(
  //   (res) => res?.n || null
  // )
}
