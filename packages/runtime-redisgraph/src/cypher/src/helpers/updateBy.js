import { diff } from '../util/object.js'
import { paramify } from '../util/params.js'
import cleanPrefix from '../util/cleanPrefix.js'
import buildWhereQuery from '../util/buildWhereQuery.js'

export async function cypherUpdateBy (
  label,
  where,
  params,
  projection = [],
  opts = {}
) {
  const toParams = diff({}, params, {
    ignore: ['__id', '__typename']
  })

  const paramsCypher = paramify(toParams, {
    ...opts,
    prefix: 'node.',
    separator: '='
  })

  let whereQuery = ''
  if (typeof where === 'object' && Object.keys(where).length > 0) {
    whereQuery = `WHERE ${buildWhereQuery(where, { prefix: 'node.' })}`
  }

  const query = `
      MATCH (node:${label})
      ${whereQuery}
      SET ${paramsCypher}
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `

  const res = await this.exec1(query)

  if (!res) throw new Error(`${label} not found`)

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.map(x => x.node))
}
