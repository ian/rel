import PhoneNumber from "./phoneNumber"

describe("default properties", () => {
  const subject = () => {
    return new PhoneNumber()
  }

  it("should set the GQL type", () => {
    expect(subject()._name).toBe("PhoneNumber")
  })
})
