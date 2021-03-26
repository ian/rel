import Field from "./field"

export class Geo {
  lat: number
  lng: number

  constructor({ lat, lng }) {
    this.lat = lat
    this.lng = lng
  }
}
export default class GeoField extends Field {
  // _validator = string()

  constructor() {
    super("Geo")
  }
}
