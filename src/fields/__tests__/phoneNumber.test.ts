import PhoneNumber from "../phoneNumber"

describe("default properties", () => {
  const subject = () => {
    return new PhoneNumber()
  }

  it("should set the GQL type", () => {
    expect(subject()._gqlName).toBe("PhoneNumber")
  })

  it("should define required", () => {
    expect(subject().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(subject().guard).toBeDefined()
  })
})
