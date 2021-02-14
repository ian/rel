export default class BaseField {
  _required = false
  _guard = null

  required() {
    this._required = true
    return this
  }

  guard(scope) {
    this._guard = scope
    return this
  }
}
