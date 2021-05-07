import Field from "./field"

export default class String extends Field {
  // _validator = string()

  hydrate(hydrator, { obj }) {
    // @todo for next refactor
  }

  constructor() {
    super("String")
  }
}
