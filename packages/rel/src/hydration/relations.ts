import camelcase from "camelcase"
import _ from "lodash"
import { resolveNode } from "../util/node"
import Rel from "../meta"
import { Guard, Handler, Hydrator, RelationDirection } from "../types"

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

export function hydrateAddRelation(name, relation: HydrateableRelation) {
  const { from, to, singular = false, rel } = relation

  const fromId = `${camelcase(from.label)}Id`
  const toId = `${camelcase(to.label)}Id`

  const handler = async (runtime) => {
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

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        name,
        {
          [`${camelcase(from.label)}Id`]: Rel.uuid().required(),
          [`${camelcase(to.label)}Id`]: Rel.uuid().required(),
        },
        Rel.ref(to.label),
        handler
      )
    )
  }
}

export function hydrateRemoveRelation(name, relation: HydrateableRelation) {
  const { from, to, rel /*singular = false*/ } = relation

  const fromId = `${camelcase(from.label)}Id`
  const toId = `${camelcase(to.label)}Id`

  const handler = async (runtime) => {
    const { cypher } = runtime
    const fromResolved = resolveNode("from", from, runtime, {
      params: ({ params }) => ({ id: params[fromId] }),
    })
    const toResolved = resolveNode("to", to, runtime, {
      params: ({ params }) => ({ id: params[toId] }),
    })
    const relResolved = resolveRel(rel)

    return cypher
      .deleteRelation(fromResolved, toResolved, relResolved)
      .then((res) => res?.to)
  }

  return (hydrator: Hydrator) => {
    hydrator.endpoints(
      Rel.mutation(
        name,
        {
          [`${camelcase(from.label)}Id`]: Rel.uuid().required(),
          [`${camelcase(to.label)}Id`]: Rel.uuid().required(),
        },
        Rel.ref(to.label),
        handler
      )
    )
  }
}
