import camelcase from "camelcase"
import { resolveNode } from "../models/node"

import { Resolver } from "../types"
import { ResolvedRelation, resolveRel } from "./relation"

export function addRelationResolver(relation: ResolvedRelation): Resolver {
  const { from, to, singular = false, rel } = relation

  const fromId = `${camelcase(from.label)}Id`
  const toId = `${camelcase(to.label)}Id`

  return async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ params }) => ({ id: params[fromId] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: ({ params }) => ({ id: params[toId] }),
    })
    const relResolved = resolveRel(rel)

    return cypher
      .createRelation(fromResolved, toResolved, relResolved, {
        singular,
      })
      .then((res) => res?.to)
  }
}
