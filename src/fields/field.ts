export default class Field {
  _gqlName: string
  _required: boolean = false
  _guard: string = null

  constructor(name: string) {
    this._gqlName = name
  }

  required(): Field {
    this._required = true
    return this
  }

  guard(scope): Field {
    this._guard = scope
    return this
  }
}
