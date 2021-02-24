import Int from "./int"

describe("default properties", () => {
  const subject = () => {
    return new Int()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("Int")
  })
})
