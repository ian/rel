import _ from "lodash"
import camelcase from "camelcase"
import { Direction, GraphQLOperationType, Resolver } from "../types"
import { array, uuid, ref } from "../fields"
import { addRelationResolver } from "./add"
import { removeRelationResolver } from "./remove"
import { listRelationResolver } from "./list"
import { Reducer } from "../server"

export type ResolvedRelation = {
  from: {
    label: string
  } | null
  to: {
    label: string
  }
  rel: {
    label: string
    direction: Direction
  }
  singular: boolean
  order: string
  guard?: string
}

export function resolveRel(rel) {
  return {
    name: _.camelCase(rel.label) + "Rel",
    direction: rel.direction,
    label: rel.label,
  }
}

export type RelationOpts = {
  endpoints?: boolean | { add: string; remove: string }
}

const DEFAULT_OPTS = {
  endpoints: true,
}
export default class Relation {
  _label: string
  _endpoints: { add?: boolean | string; remove?: boolean | string }
  _guard: string = null
  _from: {
    label: string
  } = null
  _to: {
    label: string
  } = null
  _direction: Direction = Direction.OUT
  _singular: boolean = false
  _order: string = null
  _resolver: Resolver

  constructor(label: string, to: string, opts?: RelationOpts) {
    this._label = label
    this.to(to)

    const _opts = {
      ...DEFAULT_OPTS,
      ...opts,
    }

    this.endpoints(_opts.endpoints)
  }

  guard(scope: string) {
    this._guard = scope
    return this
  }

  // @todo - should we support custom from overrides?
  // from(from: string) {
  //   this._from = {
  //     label: from,
  //   }
  //   return this
  // }

  to(to: string) {
    this._to = {
      label: to,
    }
    return this
  }

  endpoints(endpoints: boolean | { add: string; remove: string }) {
    if (!endpoints) return this

    if (endpoints === true) {
      this._endpoints = { add: true, remove: true }
    } else {
      this._endpoints = endpoints
    }

    return this
  }

  singular() {
    this._singular = true
    return this
  }

  inbound() {
    this._direction = Direction.IN
    return this
  }

  direction(d: Direction) {
    this._direction = d
    return this
  }

  order(order: string) {
    this._order = order
    return this
  }

  resolver(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  reduce(reducer: Reducer, { fieldName, modelName }) {
    const relation = {
      from: this._from || { label: modelName },
      to: this._to,
      rel: {
        label: this._label,
        direction: this._direction,
      },
      guard: this._guard,
      singular: this._singular,
      order: this._order,
    }

    const fromLabel = relation.from.label
    const toLabel = relation.to.label
    const resolver = this._resolver || listRelationResolver(relation)

    reducer.reduce({
      outputs: {
        [modelName]: {
          [fieldName]: (this._singular
            ? ref(relation.to.label).guard(this._guard)
            : array(ref(relation.to.label)).required().guard(this._guard)
          ).resolver(resolver),
        },
      },
    })

    if (this._endpoints) {
      if (this._endpoints.add) {
        const label =
          this._endpoints.add === true
            ? // if it's boolean, dynamically generate the name
              this._singular
              ? `${relation.from.label}Set${this._to.label}`
              : `${relation.from.label}Add${this._to.label}`
            : // if it's string, use the label name
              this._endpoints.add

        reducer.reduce({
          graphQLEndpoints: [
            {
              label,
              type: GraphQLOperationType.MUTATION,
              params: {
                [`${camelcase(fromLabel)}Id`]: uuid().required(),
                [`${camelcase(toLabel)}Id`]: uuid().required(),
              },
              returns: ref(toLabel),
              resolver: addRelationResolver(relation),
            },
          ],
        })
      }
      if (this._endpoints.remove) {
        const label =
          this._endpoints.remove === true
            ? `${relation.from.label}Remove${this._to.label}`
            : this._endpoints.remove

        reducer.reduce({
          graphQLEndpoints: [
            {
              label,
              type: GraphQLOperationType.MUTATION,
              params: {
                [`${camelcase(fromLabel)}Id`]: uuid().required(),
                [`${camelcase(toLabel)}Id`]: uuid().required(),
              },
              returns: ref(toLabel),
              resolver: removeRelationResolver(relation),
            },
          ],
        })
      }
    }
  }
}
