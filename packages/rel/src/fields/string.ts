import Field from "./field"

export default class String extends Field {
  // _validator = string()

  constructor() {
    super("String")
  }

  get scalar() {
    return "String"
  }
}
