import buildWhereQuery from '../util/buildWhereQuery.js'
import cleanPrefix from '../util/cleanPrefix.js'

export async function cypherList (label, opts, projection = [], fieldArgs = {}) {
  const { order , skip, limit, where } = opts || {}

  const cypherQuery = []

  const aggregations = ['sum', 'count', 'max', 'min', 'avg']

  const agg = aggregations.find(agg => !!fieldArgs[agg])

  const aggField = agg ? fieldArgs[agg]?.__arguments.find(a => !!a.of)?.of : null

  const isDistinct = agg ? fieldArgs[agg]?.__arguments.find(a => !!a.distinct)?.distinct?.value : false
  
  cypherQuery.push(`MATCH (node:${label})`)

  if (typeof where === 'object' && Object.keys(where).length > 0) {
    const whereQuery = buildWhereQuery(where, { prefix: 'node.' })
    cypherQuery.push(`WHERE ${whereQuery}`)
  }

  const fields = projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : (aggField ? '' : 'node')
  cypherQuery.push(`RETURN ${fields + (fields !== '' && aggField ? ',' : '') + (aggField ? agg + '(' + (isDistinct ? 'DISTINCT ' : '') + 'node.' + aggField.value + ')' : '')}`)

  // order
  if (Array.isArray(order) && !aggField) {
    const orderFields = order.reduce((previous, current, idx, arr) => {
      return previous + `node.${current.field} ${current.order ?? "asc"}${idx === arr.length - 1 ? '' : ','}`
    }, "")
    cypherQuery.push(`ORDER BY ${orderFields}`)
  }

  // pagination
  if (skip && !aggField) cypherQuery.push(`SKIP ${skip}`)
  if (limit && !aggField) cypherQuery.push(`LIMIT ${limit}`)

  const query = cypherQuery.join(' ') 

  const res = await this.exec(query)

  return (projection.length > 0 || aggField ? cleanPrefix(res, 'node.') : res.map(x => x.node))
}
