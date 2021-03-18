import { phoneNumber } from "../../src/property/fields"

describe("default properties", () => {
  const subject = () => {
    return phoneNumber()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("PhoneNumber")
  })
})
