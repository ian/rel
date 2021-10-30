import _ from "lodash"
import {
  Node,
  Rel,
  CypherListAssociationOpts,
  CypherCreateAssociationOpts,
  CypherDeleteAssociationOpts,
} from "../types"

import { cypherNode } from "./node"
import { cypherRel } from "./rel"

export async function cypherListRelationship(
  from: Node,
  rel: Rel | string,
  to: Node | string,
  opts?: CypherListAssociationOpts
) {
  const fromCypher = cypherNode("from", from)
  const relCypher = cypherRel("rel", rel)
  const toCypher = cypherNode("to", to)

  const {
    singular,
    order,
    skip = 0,
    limit = null,
    orderRaw,
    where,
  } = opts || {}
  const orderBy = orderRaw || `to.${order || "id"}`

  if (singular) {
    return this.exec1(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN to
    ORDER BY ${orderBy}
    ${skip ? `SKIP ${skip}` : ""}
    LIMIT 1
    `
    ).then((r) => r?.to)
  } else {
    return this.exec(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN to
    ORDER BY ${orderBy}
    ${skip ? `SKIP ${skip}` : ""}
    ${limit ? `LIMIT ${limit}` : ""}
  `
    ).then((res) => res.map((r) => r?.to))
  }
}

export async function cypherClearRelation(from: Node, rel: Rel | string) {
  const fromCypher = cypherNode("from", from)
  const relCypher = cypherRel("rel", rel)

  return this.exec(`
  MATCH ${fromCypher}
  OPTIONAL MATCH (from)${relCypher}()
  DELETE rel
  RETURN from;
`)
}

export async function cypherCreateRelationship(
  from: Node,
  rel: Rel | string,
  to: Node,
  opts?: CypherCreateAssociationOpts
) {
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
  from: Node,
  rel: Rel,
  to: Node
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
