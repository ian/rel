import Field from "./field"
export default class Array extends Field {
  _contains = null
  // _validator = object()

  constructor(contains: Field) {
    super(`[${contains._name}]`)
    this._contains = contains
  }
}
