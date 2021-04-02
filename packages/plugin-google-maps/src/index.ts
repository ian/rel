import { Client as GoogleMaps } from "@googlemaps/google-maps-services-js"
import { Module } from "@reldb/types"
import { GeoField, StringField } from "@reldb/meta"

import { geocodeAddress } from "./google"
import { GeolocationOpts } from "./types"

let key = null
export class GelocatedField extends GeoField {
  opts = null

  constructor(opts: GeolocationOpts) {
    super()

    if (!opts?.from)
      throw new Error("Geolocation requires { from: '...' } to be specified")

    const { from } = opts

    // @todo - check for existence of from on object

    this.resolver(async (runtime) => {
      const { obj } = runtime
      const geocoded = await geocodeAddress(key, obj[from])
      if (!geocoded) return null
      return geocoded.geo
    })
  }
}

export class GelocatedAddressField extends StringField {
  constructor(opts: GeolocationOpts) {
    super()

    if (!opts?.from)
      throw new Error("Geolocation requires { from: '...' } to be specified")

    const { from } = opts

    // @todo - check for existence of from on object

    this.resolver(async (runtime) => {
      const { obj } = runtime
      const geocoded = await geocodeAddress(key, obj[from])
      if (!geocoded) return null
      return geocoded.address
    })
  }
}

export function geolocated(opts: GeolocationOpts) {
  return new GelocatedField(opts)
}

export function geolocatedAddress(opts: GeolocationOpts) {
  return new GelocatedAddressField(opts)
}

type Config = {
  apiKey: string
}

export default (init: Config): Module => {
  if (!init?.apiKey)
    throw new Error("GoogleMaps requires { apiKey: '...' } to be specified")

  const { apiKey } = init
  key = apiKey

  // Currently we don't need to modify the schema, maybe in the future we will.
  return {}
}
