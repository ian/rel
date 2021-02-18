import BaseField from "../field"

class TestField extends BaseField {}

describe("default properties", () => {
  const subject = () => {
    return new TestField("TestField")
  }

  it("should set the GQL type", () => {
    expect(subject()._gqlName).toBe("TestField")
  })

  it("should define required", () => {
    expect(subject().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(subject().guard).toBeDefined()
  })
})
