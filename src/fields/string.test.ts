import String from "./string"

describe("default properties", () => {
  const subject = () => {
    return new String()
  }

  it("should set the GQL type", () => {
    expect(subject()._name).toBe("String")
  })
})
