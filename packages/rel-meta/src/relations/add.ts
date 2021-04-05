import camelcase from "camelcase"
import { resolveNode } from "../objects/node"

import { cypherCreateRelationship } from "@reldb/cypher"
import { Resolver } from "@reldb/types"

import { ResolvedRelation, resolveRel } from "./relation"

export function addRelationResolver(relation: ResolvedRelation): Resolver {
  const { from, to, singular = false, rel } = relation

  const fromId = `${camelcase(from.label)}Id`
  const toId = `${camelcase(to.label)}Id`

  return async (runtime) => {
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ params }) => ({ id: params[fromId] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: ({ params }) => ({ id: params[toId] }),
    })
    const relResolved = resolveRel(rel)

    return cypherCreateRelationship(fromResolved, toResolved, relResolved, {
      singular,
    }).then((res) => res?.to)
  }
}
