import Field from "./field"
import { object } from "yup"

export default class Type extends Field {
  _contains = null
  _validator = object()

  constructor(contains: Field) {
    super(`[${contains._name}]`)
    this._contains = contains
  }
}
