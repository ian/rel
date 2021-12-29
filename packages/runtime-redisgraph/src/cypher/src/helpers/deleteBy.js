import cleanPrefix from '../util/cleanPrefix.js'
import buildWhereQuery from '../util/buildWhereQuery.js'

export async function cypherDeleteBy (label, where, projection = []) {
  let whereQuery = ''
  if (typeof where === 'object' && Object.keys(where).length > 0) {
    whereQuery = `WHERE ${buildWhereQuery(where, { prefix: 'node.' })}`
  }

  const res = await this.exec1(
    `
      MATCH (node:${label})
      ${whereQuery}
      DELETE node
      RETURN ${projection.length > 0 ? projection.reduce((previous, current, idx, arr) => previous + `node.${current}${idx === arr.length - 1 ? '' : ','}`, '') : 'node'};
    `
  )

  return (projection.length > 0 ? cleanPrefix(res, 'node.') : res.map(x => x.node))
}
