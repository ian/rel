import _ from "lodash"
import camelcase from "camelcase"
import { Direction, Relation, ENDPOINTS } from "@reldb/types"
import { array, uuid, type } from "../fields"
import { addRelationResolver } from "./add"
import { removeRelationResolver } from "./remove"
import { listRelationResolver } from "./list"

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

export default class RelationField implements Relation {
  _label: string
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

  constructor(label: string, to?: string) {
    this._label = label
    this.to(to)
  }

  guard(scope: string) {
    this._guard = scope
    return this
  }

  from(from: string) {
    this._from = {
      label: from,
    }
    return this
  }

  to(to: string) {
    this._to = {
      label: to,
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

  reduce(reducer, { fieldName, modelName }) {
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

    const createRelEndpoint = this._singular
      ? `${relation.from.label}Set${this._to.label}`
      : `${relation.from.label}Add${this._to.label}`
    const removeRelEndpoint = `${relation.from.label}Remove${this._to.label}`

    const fieldResolver = listRelationResolver(relation)

    reducer({
      outputs: {
        [modelName]: {
          [fieldName]: (this._singular
            ? type(relation.to.label)
            : array(type(relation.to.label)).required()
          ).resolver(fieldResolver),
        },
      },
      endpoints: {
        [createRelEndpoint]: {
          target: ENDPOINTS.MUTATOR,
          params: {
            [`${camelcase(fromLabel)}Id`]: uuid().required(),
            [`${camelcase(toLabel)}Id`]: uuid().required(),
          },
          returns: type(toLabel),
          resolver: addRelationResolver(relation),
        },
        [removeRelEndpoint]: {
          target: ENDPOINTS.MUTATOR,
          params: {
            [`${camelcase(fromLabel)}Id`]: uuid().required(),
            [`${camelcase(toLabel)}Id`]: uuid().required(),
          },
          returns: type(toLabel),
          resolver: removeRelationResolver(relation),
        },
      },
    })
  }
}
