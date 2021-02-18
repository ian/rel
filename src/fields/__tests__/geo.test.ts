import Geo from "../geo"

describe("default properties", () => {
  const subject = () => {
    return new Geo()
  }

  it("should set the GQL type", () => {
    expect(subject()._gqlName).toBe("Geo")
  })

  it("should define required", () => {
    expect(subject().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(subject().guard).toBeDefined()
  })
})
