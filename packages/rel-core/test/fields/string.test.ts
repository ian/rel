import { Fields } from "../../src"
const { string } = Fields

describe("default properties", () => {
  const subject = () => {
    return string()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("String")
  })
})
