import { andify } from '../util/params'

export async function cypherCount(label, opts?) {
  const { where } = opts || {}

  const cypherQuery = []

  cypherQuery.push(`MATCH (node:${label})`)

  if (where) {
    cypherQuery.push(`WHERE ${andify(where, { prefix: 'node.' })}`)
  }

  // @todo support multiple returns
  cypherQuery.push(`RETURN COUNT(node) as count`)

  return this.exec1(cypherQuery.join('\n')).then((res) => res.count)
}
