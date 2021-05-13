import {
  FieldRuntimeOpts,
  Guard,
  Resolver,
  HydrationOpts,
  Runtime,
  HydrateableProperty,
  HydrationPropertyOpts,
} from "../types"

export default abstract class Field implements HydrateableProperty {
  _label: string
  _required: boolean = false
  _autogen: boolean = false
  _guard: Guard = null
  _resolver: Resolver = null
  _default: Resolver | any

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

  resolve(resolver: Resolver): Field {
    this._resolver = resolver
    return this
  }

  default(valueOrFn): Field {
    this._default = valueOrFn
    return this
  }

  // abstract hydrate(hydrator, { obj })

  hydrate(hydration: HydrationOpts, opts: HydrationPropertyOpts) {
    const { composer } = hydration
    // @todo
  }

  get inputType() {
    return this._label
  }

  get outputType() {
    return this._label
  }

  get isRequired() {
    return this._required
  }

  get resolver() {
    return this._resolver
  }

  defaulted(runtime: Runtime, opts: FieldRuntimeOpts): any {
    if (this._default) {
      if (typeof this._default === "function") {
        return this._default(...runtime, opts)
      } else {
        return this._default
      }
    }
  }
}
