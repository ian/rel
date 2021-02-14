import BaseField from "./base"
import { object } from "yup"

export default class Geo extends BaseField {
  _gqlName = null
  _validator = object()

  constructor(model) {
    super()
    this._gqlName = model
  }
}
