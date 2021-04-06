import Rel, { testServer } from "@reldb/run"

import GoogleMaps, { geolocated } from "../src"

describe("#geolocated", () => {
  describe("errors", () => {
    it("should error if google was not initialized", async (done) => {
      const { errors } = await server(
        geolocated({ from: "address" }),
        false
      )(
        `
      mutation {
        restaurant: CreateRestaurant(input: { address: "Bennelong Point, Sydney NSW 2000, Australia" }) {
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
    it("should geolocate the address", async () => {
      const { data } = await server(geolocated({ from: "address" }))(
        `
      mutation {
        restaurant: CreateRestaurant(input: { address: "Bennelong Point, Sydney NSW 2000, Australia" }) {
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
    })

    it("should fail gracefully if google errors", async () => {
      const { data } = await server(geolocated({ from: "address" }))(
        `
      mutation {
        restaurant: CreateRestaurant(input: { address: "dfskljdsfkljsdflkjfdskljfdskljsfd" }) {
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
  return testServer(
    {
      schema: {
        Restaurant: Rel.model({
          address: Rel.string().required(),
          geo,
        }),
      },
      plugins: [
        addPlugin
          ? GoogleMaps({
              apiKey: process.env.GOOGLE_MAPS_API_KEY,
            })
          : null,
      ],
    },
    {
      // log: true,
    }
  )
}
