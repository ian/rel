import { string } from "../../fields"
import { generateFields } from "./fields"

describe("generateFields", () => {
  const subject = (fields) => {
    return generateFields(fields)
  }

  it("should convert a Field to a ReducedTypeField", () => {
    const res = subject({ name: string() })
    const expectation = { name: { typeDef: { returns: string() } } }
    expect(JSON.stringify(res)).toEqual(JSON.stringify(expectation))
  })
})
