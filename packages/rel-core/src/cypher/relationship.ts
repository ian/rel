import _ from "lodash"
import { cypher, cypher1 } from "./cypher"
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
    return cypher1(`
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN ${to.name}
    ORDER BY ${orderBy}
    LIMIT 1
    `).then((r) => r[to.name])
  } else {
    return cypher(`
    MATCH ${fromCypher}${relCypher}${toCypher}
    RETURN ${to.name}
    ORDER BY ${orderBy}
  `).then((res) => res.map((r) => r[to.name]))
  }
}

export async function clearRelationship(
  from: CypherNodeOpts,
  rel: CypherRelOpts
) {
  const fromCypher = cypherNode(from)
  const relCypher = cypherRel(rel)

  return cypher1(`
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

  const fromCypher = cypherNode(from)
  const toCypher = cypherNode(to)
  const relCypher = cypherRel(rel)

  if (singular) {
    await clearRelationship(from, rel)
  }
  return cypher1(`
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
  const fromCypher = cypherNode(from)
  const toCypher = cypherNode(to)
  const relCypher = cypherRel(rel)

  return cypher1(`
    MATCH ${fromCypher}, ${toCypher}
    MATCH (${from.name})${relCypher}(${to.name})
    DELETE ${rel.name}
    RETURN ${from.name}, ${to.name}, ${rel.name};
  `)
}
