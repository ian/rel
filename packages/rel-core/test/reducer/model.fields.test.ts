import { string } from "../../src/fields"
import { reduceFields } from "../../src/reducer/fields"

describe("reduceFields", () => {
  const subject = (fields) => {
    return reduceFields("Fake", fields)
  }

  it("should convert a Field to a ReducedTypeField", () => {
    const res = subject({ name: string() })
    const expectation = { name: { typeDef: { returns: string() } } }
    expect(JSON.stringify(res)).toEqual(JSON.stringify(expectation))
  })
})
