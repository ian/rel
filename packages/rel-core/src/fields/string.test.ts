import String from "./string"

describe("default properties", () => {
  const subject = () => {
    return new String()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("String")
  })
})
