import Field from "./field"

export default class UUID extends Field {
  // _validator = string()

  constructor() {
    super("UUID")
  }
}
