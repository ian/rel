import Geo from "./geo"

describe("default properties", () => {
  const subject = () => {
    return new Geo()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("Geo")
  })
})
