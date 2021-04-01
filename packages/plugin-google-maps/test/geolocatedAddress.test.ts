import { makeServer } from "@reldb/testing"
import { string, model } from "@reldb/meta"

import GoogleMaps, { geolocatedAddress } from "../src"

describe("#geolocatedAddress", () => {
  it("should error if google was not initialized", () => {
    expect(() => geolocatedAddress({ from: "fake" })).toThrowError(
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
      expect(() => geolocatedAddress(null)).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )

      // @ts-ignore
      expect(() => geolocatedAddress({})).toThrowError(
        "Geolocation requires { from: '...' } to be specified"
      )
    })

    it("should have a reduced type of String", () => {
      // GoogleMaps({
      //   apiKey: "FAKE123",
      // })

      // expect(geolocatedAddress({ from: "fake" }).toGQL()).toBe("String")
      const { typeDefs } = server()
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
        geo: "Bennelong Point, Sydney NSW 2000, Australia",
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

const server = (extras = {}) => {
  return makeServer(
    {
      schema: {
        Restaurant: model("Restaurant")
          .fields({
            address: string().required(),
            geo: geolocatedAddress({ from: "address" }),
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
