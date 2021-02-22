import Geo from "./geo"

describe("default properties", () => {
  const subject = () => {
    return new Geo()
  }

  it("should set the GQL type", () => {
    expect(subject()._name).toBe("Geo")
  })
})
