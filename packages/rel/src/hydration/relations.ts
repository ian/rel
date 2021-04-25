import camelcase from "camelcase"
import _ from "lodash"
import { resolveNode } from "../util/node"
import Rel from "../meta"
import {
  Guard,
  Handler,
  Hydrator,
  RelationDirection,
  RelationEndpointOpts,
} from "../types"

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
  handler: Handler
) {
  const { from, to, rel, singular = false, order, guard } = relation

  const defaultHandler = async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      // always default the from to be the current object
      params: ({ obj }) => ({ id: obj.id }),
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

  return (hydrator: Hydrator, { obj, propName }) => {
    const prop = singular
      ? Rel.ref(relation.to.label).guard(guard)
      : Rel.array(Rel.ref(relation.to.label)).required().guard(guard)

    hydrator.outputs(
      Rel.output(obj, {
        [propName]: prop.handler(handler || defaultHandler),
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

  const handler = async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ params }) => ({ id: params[fromParam] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: ({ params }) => ({ id: params[toParam] }),
    })
    const relResolved = resolveRel(rel)

    return cypher
      .createRelation(fromResolved, toResolved, relResolved, {
        singular,
      })
      .then((res) => res?.to)
  }

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        name,
        {
          [fromParam]: Rel.uuid().required(),
          [toParam]: Rel.uuid().required(),
        },
        Rel.ref(to.label),
        handler
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

  const handler = async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ params }) => ({ id: params[fromParam] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: singular
        ? {}
        : ({ params }) => {
            id: params[toParam]
          },
    })
    const relResolved = resolveRel(rel)

    const res = await cypher
      .deleteRelation(fromResolved, toResolved, relResolved)
      .then((res) => res?.to)

    return res
  }

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        name,
        singular
          ? {
              [fromParam]: Rel.uuid().required(),
              // [toParam]: Rel.uuid().required(),
            }
          : {
              [fromParam]: Rel.uuid().required(),
              [toParam]: Rel.uuid().required(),
            },
        Rel.ref(to.label),
        handler
      ).guard(guard)
    )
  }
}
