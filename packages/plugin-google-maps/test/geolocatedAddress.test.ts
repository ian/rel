import Rel, { testServer } from "@reldb/run"

import GoogleMaps, { geolocatedAddress } from "../src"

describe("#geolocatedAddress", () => {
  it("should error if google was not initialized", async (done) => {
    const { errors } = await server(
      geolocatedAddress({ from: "address" }),
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
      const { data } = await server(geolocatedAddress({ from: "address" }))(
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
      const { data } = await server(geolocatedAddress({ from: "address" }))(
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
        Restaurant: Rel.model("Restaurant").fields({
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
