export type Field = {
  _gqlName: string
  _required: boolean
  _guard?: string
  required: () => Field
}
export default class BaseField {
  _required: boolean = false
  _guard: string = null

  required() {
    this._required = true
    return this
  }

  guard(scope) {
    this._guard = scope
    return this
  }
}
