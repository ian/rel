import Field from "./field"
export default class GeoField extends Field {
  // _validator = string()

  // hydrate(hydration, opts) {
  //  super.hydrate(hydration, opts)
  //   // @todo for next refactor
  //   console.log("geo hydrate", obj)
  //   // hydrator.inputs(Rel.input(`${}`))
  // }

  constructor() {
    super("Geo")
  }

  get scalar() {
    return "Geo"
  }
}
