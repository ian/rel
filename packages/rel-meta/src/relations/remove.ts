import camelcase from "camelcase"
import { resolveNode } from "../models/node"

import { cypherDeleteRelationship } from "@reldb/cypher"
import { Resolver } from "@reldb/types"

import { ResolvedRel, resolveRel } from "./rel"

export function removeRelationResolver(relation: ResolvedRel): Resolver {
  const { from, to, rel /*singular = false*/ } = relation

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

    return cypherDeleteRelationship(fromResolved, toResolved, relResolved).then(
      (res) => res?.to
    )
  }
}
