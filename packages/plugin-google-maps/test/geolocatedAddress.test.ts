import Rel, { testServer } from "@reldb/run"

import GoogleMaps, { geolocatedAddress } from "../src"

describe("#geolocatedAddress", () => {
  it("should error if google was not initialized", async (done) => {
    const { graphql } = server(geolocatedAddress({ from: "address" }), false)

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

  describe("with initialized google maps", () => {
    it("should require from", () => {
      expect(() => server(geolocatedAddress(null))).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )

      // @ts-ignore
      expect(() => server(geolocatedAddress({}))).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )
    })

    it("should have a reduced type of String", () => {
      const { typeDefs } = server(geolocatedAddress({ from: "address" }))
      expect(typeDefs).toMatch(`type Restaurant {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  address: String!
  geo: String
}
`)
    })
  })

  describe("with server running", () => {
    it("should geolocate the address", async () => {
      const { graphql } = server(geolocatedAddress({ from: "address" }))
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

      expect(data.restaurant).toEqual({
        address: "Bennelong Point, Sydney NSW 2000, Australia",
        geo: "Bennelong Point, Sydney NSW 2000, Australia",
      })
    })

    it("should fail gracefully if google errors", async () => {
      const { graphql } = server(geolocatedAddress({ from: "address" }))
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
