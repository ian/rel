import { Field } from "../types"
import BaseField from "./field"
export default class Array extends BaseField {
  _contains = null

  constructor(contains: Field) {
    super(`[${contains.label}]`)
    this._contains = contains
  }
}
