import PhoneNumber from "./phoneNumber"

describe("default properties", () => {
  const subject = () => {
    return new PhoneNumber()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("PhoneNumber")
  })
})
