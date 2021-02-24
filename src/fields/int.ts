import { number } from "yup"
import Field from "./field"

export default class Int extends Field {
  _validator = number()

  constructor() {
    super("Int")
  }
}
