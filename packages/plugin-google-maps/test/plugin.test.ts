import Plugin from "../src/index"

describe("#geolocatedAddress", () => {
  it("should require apiKey", () => {
    // @ts-ignore
    expect(() => Plugin()).toThrowError(
      "GoogleMaps requires { apiKey: '...' } to be specified"
    )

    // @ts-ignore
    expect(() => Plugin({})).toThrowError(
      "GoogleMaps requires { apiKey: '...' } to be specified"
    )
  })

  it.todo("should modify the schema")
})
