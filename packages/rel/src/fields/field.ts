import {
  Field,
  FieldRuntimeOpts,
  Guard,
  PropertyHandler,
  ReducibleProperty,
  Runtime,
} from "../types"

export default class FieldImpl implements Field {
  _label: string
  _required: boolean = false
  _autogen: boolean = false
  _guard: Guard = null
  _handler: PropertyHandler = null
  _default: PropertyHandler | any

  constructor(label: string) {
    this._label = label
  }

  get label() {
    return this._label
  }

  required(r = true): Field {
    this._required = r
    return this
  }

  guard(scope): Field {
    this._guard = scope
    return this
  }

  handler(handler: PropertyHandler): Field {
    this._handler = handler
    return this
  }

  default(valueOrFn): Field {
    this._default = valueOrFn
    return this
  }

  // abstract hydrate(hydrator: Hydrator)

  hydrate(hydrator, { obj }) {
    // @todo
  }

  reduce(): ReducibleProperty {
    return {
      returns: this._label,
      required: this._required,
      handler: this._handler,
      guard: this._guard && this._guard.reduce(),
    }
  }

  defaulted(runtime: Runtime, opts: FieldRuntimeOpts): any {
    if (this._default) {
      if (typeof this._default === "function") {
        return this._default(runtime, opts)
      } else {
        return this._default
      }
    }
  }
}
