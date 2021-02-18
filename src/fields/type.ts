import Field from "./field"
import { object } from "yup"

export default class Type extends Field {
  _gqlName = null
  _validator = object()

  constructor(model) {
    super(model)
    this._gqlName = model
  }
}
