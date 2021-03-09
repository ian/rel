import { string } from "../../src/fields"
import { reduceFields } from "../../src/reducer/models/fields"

describe("reduceFields", () => {
  const subject = (fields) => {
    return reduceFields(fields)
  }

  it("should convert a Field to a ReducedTypeField", () => {
    const res = subject({ name: string() })
    const expectation = { name: { typeDef: { returns: string() } } }
    expect(JSON.stringify(res)).toEqual(JSON.stringify(expectation))
  })
})
