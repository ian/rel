import buildWhereQuery from '../util/buildWhereQuery.js'
import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherList (label, opts, projection = []) {
  const { order = 'id', skip, limit, where } = opts || {}

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

  if (typeof where === 'object' && Object.keys(where).length > 0) {
    const whereQuery = buildWhereQuery(where, { prefix: 'node.' })
    cypherQuery.push(`WHERE ${whereQuery}`)
  }

  // @todo support multiple returns
  cypherQuery.push(`RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'}`)

  // order
  if (order) cypherQuery.push(`ORDER BY node.${order}`)

  // pagination
  if (skip) cypherQuery.push(`SKIP ${skip}`)
  if (limit) cypherQuery.push(`LIMIT ${limit}`)

  const query = cypherQuery.join(' ')

  const res = await this.exec(query)

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.map(x => x.node))
}
