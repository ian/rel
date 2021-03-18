import { Fields } from "../../src"
const { array, string } = Fields

describe("default properties", () => {
  const subject = () => {
    return array(string())
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("[String]")
  })
})
