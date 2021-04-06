import { Client } from "@googlemaps/google-maps-services-js"
import { Geo } from "@reldb/run"

type GeocodeResponse = {
  address: string
  geo: object
}

const client = new Client({
  config: {
    params: {},
  },
})

export async function geocodeAddress(
  key: string,
  rawAddress: string,
  tries: number = 0
): Promise<GeocodeResponse> {
  if (!key)
    throw new Error(
      "GoogleMaps was not initialized, make sure to add it to { plugins: [GoogleMaps(...)]}"
    )

  if (!rawAddress || rawAddress === "") return null

  let res
  try {
    res = await client
      .geocode({
        params: {
          address: rawAddress,
          key,
        },
        // this has to be here or Google API fails with Error: Headers User-Agent forbidden
        headers: null,
      })
      .then((res) => res.data.results[0])
      .catch((err) => {
        console.log(err)
      })

    if (!res) return null

    const address = res.formatted_address
    const { lat, lng } = res.geometry.location

    return {
      address,
      geo: new Geo({
        lat,
        lng,
      }),
    }
  } catch (err) {
    // console.log("Geocode Error", err.message)
    // console.log(err)

    if (tries < 1) {
      return geocodeAddress(key, rawAddress, tries + 1)
    } else {
      console.log("FINAL Geocode Error", err.message)
      // console.log(
      //   "Address Components",
      //   JSON.stringify(res.address_components, null, 2)
      // )

      return null
    }
  }
}