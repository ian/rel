import _ from "lodash"
import {
  Field,
  Relation,
  Hydrator,
  Guard,
  Input,
  InputProperties,
  ReducibleInput,
} from "../types"
import { splitProps } from "../util/props"
import Rel from "../meta"

export default class InputImpl implements Input {
  _name: string
  _guard: Guard

  _props: InputProperties
  _fields: { [name: string]: Field }
  _relations: { [name: string]: Relation }

  constructor(name: string, props: InputProperties) {
    this._name = name
    this._props = props

    const [fields, relations] = splitProps(props)

    this._fields = fields
    this._relations = relations
  }

  get name() {
    return this._name
  }

  get props() {
    return this._props
  }

  guard(scope: Guard) {
    this._guard = scope
    return this
  }

  hydrate(hydrator: Hydrator) {
    // hydrator.inputs(this)

    const [_fields, _relations] = splitProps(this._props)

    const inputFields = {
      ..._fields,
    }

    const input = Rel.input(`${this._name}Input`, inputFields).guard(
      this._guard
    )

    hydrator.inputs(input)

    Object.entries(_relations).forEach((entry) => {
      const [propName, prop] = entry
      prop.hydrate(hydrator, { obj: this.name, propName })
    })
  }

  // prepare(prepare: Handler) {
  //   this._prepare = prepare
  //   return this
  // }

  reduce(): ReducibleInput {
    const properties = Object.entries(this._props).reduce((acc, entry) => {
      const [name, prop] = entry
      acc[name] = prop.reduce()
      return acc
    }, {})

    return {
      returns: this._name,
      properties,
      guard: this._guard && this._guard.reduce(),
      // prepare: this._prepare,
    }
  }
}
