import _ from "lodash"
import { resolveNode } from "../util/node"
import {
  Guard,
  Resolver,
  HydrationOpts,
  RelationDirection,
  RelationEndpointOpts,
} from "../types"

// To IH: If you switch this to using composer interface, you don't need this cludgy import flow
import Fields from "../fields"
import Objects from "../objects"
import Endpoints from "../endpoints"

type HydrateableRelation = {
  from: {
    label: string
    id?: string
  } | null
  to: {
    label: string
    id?: string
  }
  rel: {
    label: string
    direction: RelationDirection
  }
  singular: boolean
  order: string
  guard?: Guard
}

function resolveRel(rel) {
  return {
    name: _.camelCase(rel.label) + "Rel",
    direction: rel.direction,
    label: rel.label,
  }
}

export function hydrateListRelation(
  relation: HydrateableRelation,
  resolver: Resolver
) {
  const { from, to, rel, singular = false, order, guard } = relation

  const defaultHandler = async (...runtime) => {
    const [obj, params, context] = runtime
    const { cypher } = context
    const fromResolved = resolveNode("from", from, runtime, {
      // always default the from to be the current object
      params: (obj) => ({ id: obj.id }),
    })
    const toResolved = resolveNode("to", to, runtime)
    const relResolved = resolveRel(rel)

    const list = await cypher.listRelation(
      fromResolved,
      toResolved,
      relResolved,
      {
        singular,
        order,
      }
    )

    return list
  }

  return ({ hydrator }: HydrationOpts, { obj, propName }) => {
    const prop = singular
      ? Fields.ref(relation.to.label).guard(guard)
      : Fields.array(Fields.ref(relation.to.label)).required().guard(guard)

    hydrator.outputs(
      Objects.output(obj, {
        [propName]: prop.resolve(resolver || defaultHandler),
      })
    )
  }
}

export function hydrateAddRelation(
  relation: HydrateableRelation,
  opts: RelationEndpointOpts
) {
  const { name, fromParam, toParam, guard } = opts
  const { from, to, singular, rel } = relation

  const resolver = async (...runtime) => {
    const [obj, params, context] = runtime
    const { cypher } = context
    const fromResolved = resolveNode("from", from, runtime, {
      params: (_, params) => ({ id: params[fromParam] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: (_, params) => ({ id: params[toParam] }),
    })
    const relResolved = resolveRel(rel)

    return cypher
      .createRelation(fromResolved, toResolved, relResolved, {
        singular,
      })
      .then((res) => res?.to)
  }

  return ({ hydrator }: HydrationOpts) => {
    hydrator.endpoints(
      Endpoints.mutation(
        name,
        {
          [fromParam]: Fields.uuid().required(),
          [toParam]: Fields.uuid().required(),
        },
        Fields.ref(to.label),
        resolver
      ).guard(guard)
    )
  }
}

export function hydrateRemoveRelation(
  relation: HydrateableRelation,
  opts: RelationEndpointOpts
) {
  const { from, to, singular, rel } = relation
  const { name, fromParam, toParam, guard } = opts

  const resolver = async (...runtime) => {
    const [obj, params, context] = runtime
    const { cypher } = context
    const fromResolved = resolveNode("from", from, runtime, {
      params: (_, params) => ({ id: params[fromParam] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: singular
        ? {}
        : (_, params) => {
            id: params[toParam]
          },
    })
    const relResolved = resolveRel(rel)

    const res = await cypher
      .deleteRelation(fromResolved, toResolved, relResolved)
      .then((res) => res?.to)

    return res
  }

  return ({ hydrator }: HydrationOpts) => {
    hydrator.endpoints(
      Endpoints.mutation(
        name,
        singular
          ? {
              [fromParam]: Fields.uuid().required(),
              // [toParam]: Fields.uuid().required(),
            }
          : {
              [fromParam]: Fields.uuid().required(),
              [toParam]: Fields.uuid().required(),
            },
        Fields.ref(to.label),
        resolver
      ).guard(guard)
    )
  }
}
