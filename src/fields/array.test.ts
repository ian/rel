import String from "./string"
import Array from "./array"

describe("default properties", () => {
  const subject = () => {
    return new Array(new String())
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("[String]")
  })
})
