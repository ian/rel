import Rel from "../meta"
import Field from "./field"
export default class GeoField extends Field {
  // _validator = string()

  hydrate(hydrator, { obj }) {
    // @todo for next refactor
    console.log("geo hydrate", obj)
    // hydrator.inputs(Rel.input(`${}`))
  }

  constructor() {
    super("Geo")
  }
}
