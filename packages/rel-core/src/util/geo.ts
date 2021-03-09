import { geocode } from "../ext/google"

export async function geoify(addy) {
  const geocoded = await geocode(addy)
  if (!geocoded) throw new Error(`Geocoding failed for ${addy}`)
  const { address, geo } = geocoded
  return { address, geo }
}

export { Geo } from "../ext/google"
