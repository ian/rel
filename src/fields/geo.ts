import Field from "./field"
import { string } from "yup"

export default class Geo extends Field {
  _validator = string()

  constructor() {
    super("Geo")
  }
}
