import { int } from "../../src/property/fields"

describe("default properties", () => {
  const subject = () => {
    return int()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("Int")
  })
})
