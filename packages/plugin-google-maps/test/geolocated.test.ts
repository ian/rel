import { makeServer } from "@reldb/testing"
import { Geo, string, model } from "@reldb/meta"

import GoogleMaps, { geolocated } from "../src"

describe("#geolocated", () => {
  it("should error if google was not initialized", () => {
    expect(() => geolocated({ from: "fake" })).toThrowError(
      "GoogleMaps was not initialized, make sure to add it to { plugins: [GoogleMaps(...)]}"
    )
  })

  describe("with initialized google maps", () => {
    beforeAll(() => {
      GoogleMaps({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      })
    })

    it("should require from", () => {
      expect(() => geolocated(null)).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )

      // @ts-ignore
      expect(() => geolocated({})).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )
    })

    it("should have a reduced type of Geo", () => {
      const { typeDefs } = server()
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
      const { data } = await server()(
        `
      mutation {
        restaurant: CreateRestaurant(input: { address: "Bennelong Point, Sydney NSW 2000, Australia" }) {
          address
          geo
        }
      }
    `
      )

      expect(data.restaurant).toEqual({
        address: "Bennelong Point, Sydney NSW 2000, Australia",
        geo: new Geo({
          lat: -33.8565361,
          lng: 151.2149964,
        }),
      })
    })

    it("should fail gracefully if google errors", async () => {
      const { data } = await server()(
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

const server = () => {
  return makeServer(
    {
      schema: {
        Restaurant: model()
          .fields({
            address: string().required(),
            geo: geolocated({ from: "address" }),
          })
          .accessors()
          .mutators(),
      },
      plugins: [
        GoogleMaps({
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        }),
      ],
    },
    {
      // log: true,
    }
  )
}
