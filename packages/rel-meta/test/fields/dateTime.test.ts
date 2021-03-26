import { dateTime } from "../../src"

describe("default properties", () => {
  const subject = () => {
    return dateTime()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("DateTime")
  })
})
