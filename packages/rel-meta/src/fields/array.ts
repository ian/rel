import Field from "./field"
export default class Array extends Field {
  _contains = null

  constructor(contains: Field) {
    super(`[${contains.label}]`)
    this._contains = contains
  }
}
