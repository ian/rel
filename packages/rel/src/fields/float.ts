import Field from "./field"

export default class Float extends Field {
  constructor() {
    super("Float")
  }

  get scalar() {
    return "Float"
  }
}
