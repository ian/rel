const client = require("@google/maps").createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise,
})

export class Geo {
  lat: number
  lng: number

  constructor({ lat, lng }) {
    this.lat = lat
    this.lng = lng
  }
}

// function addressComponentFor(addressComponents, anyOfThese: Array<string>) {
//   for (const type of anyOfThese) {
//     const addressComponent = addressComponents.find((a) =>
//       a.types.includes(type)
//     )

//     if (addressComponent) return addressComponent
//   }

//   return null
// }

type GeocodeResponse = {
  address: string
  geo: Geo
}

export async function geocode(rawAddress, tries = 0): Promise<GeocodeResponse> {
  if (!rawAddress || rawAddress === "") return null

  let res
  try {
    res = await client
      .geocode({
        address: rawAddress,
      })
      .asPromise()
      .then((response) => response.json.results[0])
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
    console.log("Geocode Error", err.message)
    console.log(err)

    if (tries < 2) {
      return geocode(rawAddress, tries + 1)
    } else {
      console.log("FINAL Geocode Error", err.message)
      console.log(
        "Address Components",
        JSON.stringify(res.address_components, null, 2)
      )

      return null
    }
  }
}

export default client
