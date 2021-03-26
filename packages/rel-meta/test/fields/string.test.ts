import { string } from "../../src"

describe("default properties", () => {
  const subject = () => {
    return string()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("String")
  })
})
