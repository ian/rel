import { resolveNode } from "../models/node"

import { Resolver } from "../types"
import { ResolvedRelation, resolveRel } from "./relation"

export function listRelationResolver(relation: ResolvedRelation): Resolver {
  const { from, to, rel, singular = false, order } = relation

  return async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      // always default the from to be the current object
      params: ({ obj }) => ({ id: obj.id }),
    })
    const toResolved = resolveNode("to", to, runtime)
    const relResolved = resolveRel(rel)

    return cypher.listRelation(fromResolved, toResolved, relResolved, {
      singular,
      order,
    })
  }
}
