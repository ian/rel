import Rel, { testServer } from "@reldb/run"

import GoogleMaps, { geolocated } from "../src"

describe("#geolocated", () => {
  describe("errors", () => {
    it("should error if google was not initialized", async (done) => {
      const { graphql } = server(geolocated({ from: "address" }), false)
      const { errors } = await graphql(
        `
          mutation {
            restaurant: CreateRestaurant(
              input: { address: "Bennelong Point, Sydney NSW 2000, Australia" }
            ) {
              address
              geo
            }
          }
        `
      )

      expect(errors[0].message).toEqual(
        "GoogleMaps was not initialized, make sure to add it to { plugins: [GoogleMaps(...)]}"
      )

      done()
    })
  })

  describe("with initialized google maps", () => {
    it("should require from", () => {
      expect(() => server(geolocated(null))).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )

      // @ts-ignore
      expect(() => server(geolocated(null))).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )
    })

    it("should have a reduced type of Geo", () => {
      const { typeDefs } = server(geolocated({ from: "address" }))
      expect(typeDefs).toMatch(`type Restaurant {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  address: String!
  geo: Geo
}
`)
    })
  })

  describe("with server running", () => {
    it("should geolocate the address", async (done) => {
      const { graphql } = server(geolocated({ from: "address" }))
      const { data } = await graphql(
        `
          mutation {
            restaurant: CreateRestaurant(
              input: { address: "Bennelong Point, Sydney NSW 2000, Australia" }
            ) {
              address
              geo
            }
          }
        `
      )

      const { address, geo } = data.restaurant
      expect(address).toEqual("Bennelong Point, Sydney NSW 2000, Australia")
      expect(geo.lat).toEqual(-33.8565361)
      expect(geo.lng).toEqual(151.2149964)

      done()
    })

    it("should fail gracefully if google errors", async (done) => {
      const { graphql } = server(geolocated({ from: "address" }))
      const { data } = await graphql(
        `
          mutation {
            restaurant: CreateRestaurant(
              input: { address: "dfskljdsfkljsdflkjfdskljfdskljsfd" }
            ) {
              address
              geo
            }
          }
        `
      )

      expect(data.restaurant).toEqual({
        address: "dfskljdsfkljsdflkjfdskljfdskljsfd",
        geo: null,
      })

      done()
    })
  })
})

const server = (geo, addPlugin: boolean = true) => {
  const server = testServer({ log: false }).schema(
    Rel.model("Restaurant", {
      address: Rel.string().required(),
      geo,
    }).endpoints(true)
  )

  if (addPlugin) {
    server.plugins(
      GoogleMaps({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      })
    )
  }

  return server.runtime()
}
