import { Resolver, FieldToGQLOpts } from "../types"
export default class Field {
  _name: string
  _required: boolean = false
  _params: object
  _guard: string = null
  _autogen: boolean = false
  _resolver: Resolver = null
  _default: (RuntimeDefault) => any | any

  constructor(name: string) {
    this._name = name
  }

  required(r = true): Field {
    this._required = r
    return this
  }

  guard(scope): Field {
    this._guard = scope
    return this
  }

  resolver(resolver): Field {
    this._resolver = resolver
    return this
  }

  default(valueOrFn): Field {
    this._default = valueOrFn
    return this
  }

  toGQL(opts?: FieldToGQLOpts): string {
    const { guards = true } = opts || {}

    const fieldDef = [this._name]
    if (this._required) fieldDef.push("!")
    if (guards && this._guard) fieldDef.push(` @${this._guard}`)

    return fieldDef.join("")
  }
}
