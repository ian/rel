import { cypherNode } from './node.js'
import { cypherRel } from './rel.js'

export async function cypherListRelationship (
  from,
  rel,
  to,
  opts
) {
  const fromCypher = cypherNode('from', from)
  const relCypher = cypherRel('rel', rel)
  const toCypher = cypherNode('to', to)

  const {
    singular,
    order,
    skip = 0,
    limit = null,
    orderRaw,
    where
  } = opts || {}
  const orderBy = orderRaw || `to.${order || 'id'}`

  if (singular) {
    return this.exec1(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN to
    ORDER BY ${orderBy}
    ${skip ? `SKIP ${skip}` : ''}
    LIMIT 1
    `
    ).then((r) => r?.to)
  } else {
    return this.exec(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN to
    ORDER BY ${orderBy}
    ${skip ? `SKIP ${skip}` : ''}
    ${limit ? `LIMIT ${limit}` : ''}
  `
    ).then((res) => res.map((r) => r?.to))
  }
}

export async function cypherClearRelation (from, rel) {
  const fromCypher = cypherNode('from', from)
  const relCypher = cypherRel('rel', rel)

  return this.exec(`
  MATCH ${fromCypher}
  OPTIONAL MATCH (from)${relCypher}()
  DELETE rel
  RETURN from;
`)
}

export async function cypherCreateRelationship (
  from,
  rel,
  to,
  opts
) {
  const { singular } = opts || {}

  const fromCypher = cypherNode('from', from)
  const toCypher = cypherNode('to', to)
  const relCypher = cypherRel('rel', rel)

  if (singular) {
    await this.clearRelationship(from, rel)
  }

  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MERGE (from)${relCypher}(to)
    RETURN from, rel, to;
  `)
}

export async function cypherDeleteRelationship (
  from,
  rel,
  to
  // opts?: CypherDeleteAssociationOpts
) {
  const fromCypher = cypherNode('from', from)
  const toCypher = cypherNode('to', to)
  const relCypher = cypherRel('rel', rel)

  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MATCH (from)${relCypher}(to)
    DELETE rel
    RETURN from, rel, to;
  `)
}
