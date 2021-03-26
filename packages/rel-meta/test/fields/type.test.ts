import { type } from "../../src"

describe("default properties", () => {
  const subject = () => {
    return type("RandomType")
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("RandomType")
  })
})
