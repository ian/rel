import { Direction, ResolvedRel } from "@reldb/types"
import { clean } from "./util/object"

export default class Rel {
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

  guard(scope): Rel {
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

  toResolved(): ResolvedRel {
    return clean({
      from: this._from,
      to: this._to,
      rel: {
        label: this._label,
        direction: this._direction,
      },
      guard: this._guard,
      singular: this._singular,
      order: this._order,
    }) as ResolvedRel
  }
}
