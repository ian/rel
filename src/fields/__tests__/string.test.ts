import String from "../string"

describe("default properties", () => {
  const subject = () => {
    return new String()
  }

  it("should set the GQL type", () => {
    expect(subject()._gqlName).toBe("String")
  })

  it("should define required", () => {
    expect(subject().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(subject().guard).toBeDefined()
  })
})
