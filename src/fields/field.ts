export default class Field {
  _gqlName: string
  _required: boolean = false
  _params: object
  _guard: string = null

  constructor(name: string) {
    this._gqlName = name
  }

  required(r = true): Field {
    this._required = r
    return this
  }

  guard(scope): Field {
    this._guard = scope
    return this
  }
}
