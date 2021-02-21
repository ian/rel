import { string } from "yup"
import Field from "./field"

export default class ID extends Field {
  _validator = string()

  constructor() {
    super("UUID")
  }
}
