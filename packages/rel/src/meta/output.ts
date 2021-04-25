import _ from "lodash"
import { Guard, Handler, Output, OutputProperties, Hydrator } from "../types"

export default class OutputImpl implements Output {
  _name: string
  _props: OutputProperties
  _guard: Guard
  _handler: Handler

  constructor(name: string, props: OutputProperties) {
    this._name = name
    this._props = props
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

  handler(handler: Handler) {
    this._handler = handler
    return this
  }

  hydrate(hydrator: Hydrator) {
    hydrator.outputs(this)
  }

  reduce() {
    const properties = Object.entries(this._props).reduce((acc, entry) => {
      const [name, prop] = entry
      acc[name] = prop.reduce()
      return acc
    }, {})

    return {
      returns: this._name,
      properties,
      handler: this._handler,
    }
  }
}
