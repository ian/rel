import Field from "./field"
import { string } from "yup"

export default class DateTime extends Field {
  _validator = string()

  constructor() {
    super("DateTime")
  }
}
