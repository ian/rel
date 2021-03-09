import DateTime from "../../src/fields/dateTime"

describe("default properties", () => {
  const subject = () => {
    return new DateTime()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("DateTime")
  })
})
