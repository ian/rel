import { makeServer } from "@reldb/jest"
import { Geo } from "@reldb/meta"
import { string } from "@reldb/meta"

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
      GoogleMaps({
        apiKey: "FAKE123",
      })

      expect(geolocated({ from: "fake" }).toGQL()).toBe("Geo")
    })
  })

  describe("with server running", () => {
    const server = (extras = {}) => {
      return makeServer(
        {
          schema: {
            Restaurant: {
              fields: {
                address: string().required(),
                geo: geolocated({ from: "address" }),
              },
              accessors: {
                find: true,
              },
              mutators: {
                create: true,
              },
            },
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
