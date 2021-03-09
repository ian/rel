import Type from "../../src/fields/type"

describe("default properties", () => {
  const subject = () => {
    return new Type("RandomType")
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("RandomType")
  })
})
