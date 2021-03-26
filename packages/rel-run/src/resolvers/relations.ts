import { Resolver, ResolvedRel } from "@reldb/types"

import camelcase from "camelcase"
import _ from "lodash"
import { resolveNode } from "./node"
import {
  cypherListRelationship,
  cypherCreateRelationship,
  cypherDeleteRelationship,
} from "../cypher"

export function resolveRel(rel) {
  return {
    name: _.camelCase(rel.label) + "Rel",
    direction: rel.direction,
    label: rel.label,
  }
}

export function listRelationResolver(relation: ResolvedRel): Resolver {
  const { from, to, rel, singular = false, order } = relation

  return async (runtime) => {
    const fromResolved = resolveNode("from", from, runtime, {
      // always default the from to be the current object
      params: ({ obj }) => ({ id: obj.id }),
    })
    const toResolved = resolveNode("to", to, runtime)
    const relResolved = resolveRel(rel)

    return cypherListRelationship(fromResolved, toResolved, relResolved, {
      singular,
      order,
    })
  }
}

export function addRelationResolver(relation: ResolvedRel): Resolver {
  const { from, to, singular = false, rel } = relation

  const fromId = `${camelcase(from.label)}Id`
  const toId = `${camelcase(to.label)}Id`

  return async (runtime) => {
    const { params } = runtime
    console.log("addRelationResolver", params)

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
