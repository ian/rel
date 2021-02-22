import Type from "./type"

describe("default properties", () => {
  const subject = () => {
    return new Type("RandomType")
  }

  it("should pass the GQL type through", () => {
    expect(subject()._gqlName).toBe("RandomType")
  })
})
