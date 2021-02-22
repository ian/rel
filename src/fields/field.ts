import { ToGQLOpts } from "~/types"
export default class Field {
  _name: string
  _required: boolean = false
  _params: object
  _guard: string = null

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

  toGQL(opts?: ToGQLOpts): string {
    const { guards = true } = opts || {}

    const fieldDef = [this._name]
    if (this._required) fieldDef.push("!")
    if (guards && this._guard) fieldDef.push(` @${this._guard}`)

    return fieldDef.join("")
  }
}
