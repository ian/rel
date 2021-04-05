import _ from "lodash"
import { cypherNode, CypherNodeOpts } from "./node"
import { cypherRel, CypherRelOpts } from "./rel"

type ListAssociationOpts = {
  where?: string
  order?: string
  orderRaw?: string
  singular?: boolean
}

export async function cypherListRelationship(
  from: CypherNodeOpts,
  to: CypherNodeOpts,
  rel: CypherRelOpts,
  opts?: ListAssociationOpts
) {
  const fromCypher = cypherNode(from)
  const toCypher = cypherNode(to)
  const relCypher = cypherRel(rel)

  const { singular, order, orderRaw, where } = opts || {}
  const orderBy = orderRaw || `${to.name}.${order || "id"}`

  if (singular) {
    return this.exec1(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN ${to.name}
    ORDER BY ${orderBy}
    LIMIT 1
    `
    ).then((r) => r && r[to.name])
  } else {
    return this.exec(
      `
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN ${to.name}
    ORDER BY ${orderBy}
  `
    ).then((res) => res.map((r) => r && r[to.name]))
  }
}

export async function cypherClearRelationship(
  from: CypherNodeOpts,
  rel: CypherRelOpts
) {
  const fromCypher = this.node(from)
  const relCypher = this.rel(rel)

  return this.exec1(`
  MATCH ${fromCypher}
  OPTIONAL MATCH (from)${relCypher}()
  DELETE ${rel.name}
  RETURN ${from.name};
`)
}

type CreateAssociationOpts = {
  singular?: boolean
}

export async function cypherCreateRelationship(
  from: CypherNodeOpts,
  to: CypherNodeOpts,
  rel: CypherRelOpts,
  opts?: CreateAssociationOpts
) {
  const { singular } = opts || {}

  const fromCypher = this.node(from)
  const toCypher = this.node(to)
  const relCypher = this.rel(rel)

  if (singular) {
    await this.clearRelation(from, rel)
  }
  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MERGE (${from.name})${relCypher}(${to.name})
    RETURN ${from.name}, ${to.name}, ${rel.name};
  `)
}

// type DeleteAssociationOpts = {}

export async function cypherDeleteRelationship(
  from: CypherNodeOpts,
  to: CypherNodeOpts,
  rel: CypherRelOpts
  // opts?: DeleteAssociationOpts
) {
  const fromCypher = this.node(from)
  const toCypher = this.node(to)
  const relCypher = this.rel(rel)

  return this.exec1(`
    MATCH ${fromCypher}, ${toCypher}
    MATCH (${from.name})${relCypher}(${to.name})
    DELETE ${rel.name}
    RETURN ${from.name}, ${to.name}, ${rel.name};
  `)
}
