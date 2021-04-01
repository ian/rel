import camelcase from "camelcase"
import { resolveNode } from "../models/node"

import { cypherCreateRelationship } from "@reldb/cypher"
import { Resolver } from "@reldb/types"

import { ResolvedRel, resolveRel } from "./rel"

export function addRelationResolver(relation: ResolvedRel): Resolver {
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
