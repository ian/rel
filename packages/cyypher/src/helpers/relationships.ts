import { cypherNode } from "./node.js"
import { cypherRel } from "./rel.js"
import buildWhereQuery from "../util/buildWhereQuery.js"

export async function cypherListRelationship(from, rel, to, opts) {
  const fromCypher = cypherNode("from", from)
  const relCypher = cypherRel("rel", rel)
  const toCypher = cypherNode("to", to)

  const {
    singular,
    order,
    orderRaw,
    skip = 0,
    limit = null,
    where,
  } = opts || {}

  const cypherQuery = []
  cypherQuery.push(`MATCH ${fromCypher}${relCypher}${toCypher}`)

  if (typeof where === "object" && Object.keys(where).length > 0) {
    const whereQuery = buildWhereQuery(where, { prefix: "to." })
    cypherQuery.push(`WHERE ${whereQuery}`)
  }

  cypherQuery.push(`RETURN to`)
  if (skip) cypherQuery.push(`SKIP ${skip}`)

  const orderBy = orderRaw || `to.${order || "id"}`
  cypherQuery.push(`ORDER BY ${orderBy}`)

  if (singular) {
    cypherQuery.push(`LIMIT 1`)
  } else {
    if (limit) {
      cypherQuery.push(`LIMIT ${limit}`)
    }
  }

  if (singular) {
    return this.exec1(cypherQuery.join("\n")).then((r) => r?.to)
  } else {
    return this.exec(cypherQuery.join("\n")).then((res) =>
      res.map((r) => r?.to)
    )
  }
}

export async function cypherClearRelation(from, rel) {
  const fromCypher = cypherNode("from", from)
  const relCypher = cypherRel("rel", rel)

  return this.exec(`
  MATCH ${fromCypher}
  OPTIONAL MATCH (from)${relCypher}()
  DELETE rel
  RETURN from;
`)
}

export async function cypherCreateRelationship(from, rel, to, opts) {
  const { singular } = opts || {}

  const fromCypher = cypherNode("from", from)
  const toCypher = cypherNode("to", to)
  const relCypher = cypherRel("rel", rel)

  if (singular) {
    await this.clearRelationship(from, rel)
  }

  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MERGE (from)${relCypher}(to)
    RETURN from, rel, to;
  `)
}

export async function cypherDeleteRelationship(
  from,
  rel,
  to
  // opts?: CypherDeleteAssociationOpts
) {
  const fromCypher = cypherNode("from", from)
  const toCypher = cypherNode("to", to)
  const relCypher = cypherRel("rel", rel)

  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MATCH (from)${relCypher}(to)
    DELETE rel
    RETURN from, rel, to;
  `)
}
