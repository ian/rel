import { string } from "../../fields"
import { reduceFields } from "./fields"

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
