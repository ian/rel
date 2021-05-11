import _ from "lodash"
import {
  Guard,
  Resolver,
  HydrationOpts,
  Output,
  OutputProperties,
  Hydrator,
} from "../types"
import {
  splitProps,
  duplicateProps,
  composeInputProps,
  composeOutputProps,
  composeWhereProps,
} from "../util/props"

export default class OutputImpl implements Output {
  _name: string
  _props: OutputProperties
  _guard: Guard
  _resolver: Resolver

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

  resolve(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  hydrate(hydration: HydrationOpts) {
    const { composer } = hydration
    const [_fields, _relations] = splitProps(this._props)

    const output = composer.getOrCreateOTC(this._name)
    output.addFields(composeOutputProps(_fields))
  }
}
