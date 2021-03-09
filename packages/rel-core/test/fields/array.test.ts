import String from "../../src/fields/string"
import Array from "../../src/fields/array"

describe("default properties", () => {
  const subject = () => {
    return new Array(new String())
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("[String]")
  })
})
