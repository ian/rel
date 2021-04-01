import camelcase from "camelcase"
import { Direction, Rel, ENDPOINTS } from "@reldb/types"
import { array, uuid, type } from "./fields"
import { addRelationResolver } from "./relations/add"
import { removeRelationResolver } from "./relations/remove"
import { listRelationResolver } from "./relations/list"

export default class RelField implements Rel {
  _guard: string = null

  _label: string
  _from: {
    label: string
  } = null
  _to: {
    label: string
  } = null
  _direction: Direction = Direction.OUT
  _singular: boolean = false
  _order: string = null

  constructor(label: string) {
    this._label = label
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
