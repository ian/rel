import { geocode } from "../../lib/google"

export async function geoify(addy) {
  const geocoded = await geocode(addy)
  if (!geocoded) throw new Error(`Geocoding failed for ${addy}`)
  const { address, geo } = geocoded
  return { address, geo }
}

export { Geo } from "../../lib/google"
