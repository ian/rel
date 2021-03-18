import { geo } from "../../src/property/fields"

describe("default properties", () => {
  const subject = () => {
    return geo()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("Geo")
  })
})
