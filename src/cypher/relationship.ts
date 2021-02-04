import _ from "lodash"
import { cypherNode, CypherNodeOpts } from "./node"
import { cypherRel, CypherRelOpts } from "./rel"

export type CypherRelationOpts = {
  from: CypherNodeOpts
  to: CypherNodeOpts
  rel: CypherRelOpts
  where?: string
  order?: string
  singular?: boolean
}

export function cypherListRelationship(opts: CypherRelationOpts) {
  const { from, to, rel, where, order = "to.id", singular } = opts
  const query = []

  const matchCypher = [cypherNode(from), cypherRel(rel), cypherNode(to)]

  query.push(`MATCH ${matchCypher.join("")}`)
  if (where) query.push(`WHERE ${where}`)
  query.push(`RETURN to, ${rel.name}`)
  query.push(`ORDER BY ${order};`)

  // @todo - add support for singular

  return query.join("\n")
}

export type AddAssociationOpts = {
  singular?: boolean
}

// export async function createAssociation(
//   from: object | string,
//   to: object | string,
//   relLabel: string,
//   relValues: object = {},
//   opts: CrudAssociateOpts = { singular: false }
// ) {
//   if (opts.singular) {
//     await clearAssociation(from, relLabel)
//   }
//   return cypher1(`
//     MATCH (from {id: "${objectId(from)}"}), (to {id: "${objectId(to)}"})
//     MERGE (from)-[rel:${relLabel} { ${paramify(relValues)} }]->(to)
//     RETURN from, to, rel;
//   `)
// }

export function cypherAddAssociation(
  // from: object | string,
  // to: object | string,
  // relLabel: string,
  // relValues: object = {},
  from: CypherNodeOpts,
  to: CypherNodeOpts,
  rel: CypherRelOpts,
  opts: AddAssociationOpts = { singular: false }
) {
  const query = []
  // const matchCypher = [cypherNode(from), cypherRel(rel), cypherNode(to)]
  // query.push(`MATCH ${matchCypher.join("")}`)
  // // if (where) query.push(`WHERE ${where}`)
  // query.push(`RETURN to, ${rel.name}`)
  // query.push(`ORDER BY ${order};`)

  return query.join("\n")

  //   const cypherQuery = []
  //   if (opts.singular) {
  //     cypherQuery.push(`
  //     MATCH (from {id: "${objectId(from)}"})
  //     OPTIONAL MATCH (from)-[prevRel:${relLabel}]-()
  //     DELETE prevRel
  //     RETURN from;
  //     `)
  //   }
  //   return cypher1(`
  //     MATCH (from {id: "${objectId(from)}"}), (to {id: "${objectId(to)}"})
  //     MERGE (from)-[rel:${relLabel} { ${paramify(relValues)} }]->(to)
  //     RETURN from, to, rel;
  //   `)
}

export type RemoveAssociationOpts = {
  singular?: boolean
}

// export async function deleteAssociation(
//   from: object | string,
//   to: object | string,
//   relLabel: string,
//   relValues = {}
//   // opts: CrudAssociateOpts = { singular: false }
// ) {
//   return cypher1(`
//     MATCH (from {id: "${objectId(from)}"}), (to {id: "${objectId(to)}"})
//     MATCH (from)-[rel:${relLabel} { ${paramify(relValues)} }]->(to)
//     DELETE rel
//     RETURN from, to, rel;
//   `)
// }

export async function cypherRemoveAssociation(
  from: object | string,
  to: object | string,
  relLabel: string,
  relValues = {}
  // opts: CrudAssociateOpts = { singular: false }
) {
  // return cypher1(`
  //   MATCH (from {id: "${objectId(from)}"}), (to {id: "${objectId(to)}"})
  //   MATCH (from)-[rel:${relLabel} { ${paramify(relValues)} }]->(to)
  //   DELETE rel
  //   RETURN from, to, rel;
  // `)
}
