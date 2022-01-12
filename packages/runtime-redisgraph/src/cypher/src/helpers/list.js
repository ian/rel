import buildWhereQuery from '../util/buildWhereQuery.js'
import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherList (label, opts, projection = [], fieldArgs = {}) {
  const { order = 'id', skip, limit, where } = opts || {}

  const cypherQuery = []

  const aggregations = ['sum', 'count', 'max', 'min', 'avg']

  const agg = aggregations.find(agg => !!fieldArgs[agg])

  const aggField = agg ? fieldArgs[agg]?.__arguments.find(a => !!a.of)?.of : null

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



  const fields = projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : (aggField ? '' : 'node')
  cypherQuery.push(`RETURN ${fields + (fields !== '' && aggField ? ',' : '') + (aggField ? agg + '(node.' + aggField.value + ')' : '')}`)

  // order
  if (order && !aggField) cypherQuery.push(`ORDER BY node.${order}`)

  // pagination
  if (skip && !aggField) cypherQuery.push(`SKIP ${skip}`)
  if (limit && !aggField) cypherQuery.push(`LIMIT ${limit}`)

  const query = cypherQuery.join(' ')

  const res = await this.exec(query)

  return (projection.length > 0 || aggField ? cleanPrefix(res, 'node.') : res.map(x => x.node))
}
