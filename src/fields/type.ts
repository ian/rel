import Field from "./field"
import { object } from "yup"

export default class Type extends Field {
  _validator = object()

  constructor(model) {
    super(model)
  }
}
