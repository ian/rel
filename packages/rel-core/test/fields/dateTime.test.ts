import { Fields } from "../../src/property"
const { dateTime } = Fields

describe("default properties", () => {
  const subject = () => {
    return dateTime()
  }

  it("should output the right GQL type", () => {
    expect(subject().toGQL()).toBe("DateTime")
  })
})
