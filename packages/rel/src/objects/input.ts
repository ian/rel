import _ from "lodash"
import {
  Field,
  Relation,
  Guard,
  Input,
  InputProperties,
  HydrationOpts,
} from "../types"
import { splitProps, composeInputProps } from "../util/props"

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

  hydrate(hydration: HydrationOpts) {
    const { composer } = hydration

    const [_fields, _relations] = splitProps(this._props)

    const inputFields = {
      ..._fields,
    }

    const input = composer.getOrCreateITC(this._name)
    input.addFields(composeInputProps(inputFields))
  }
}
