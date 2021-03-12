import { string } from "../../src/fields"
import { generateInput } from "../../src/generator/typeDefs/input"

const subject = (name, type) => {
  return generateInput(name, type)
}

describe("#generateInput", () => {
  describe("ReducedTypeDef as fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("BookInput", {
          name: {
            typeDef: {
              params: null,
              returns: string(),
            },
          },
        })
      ).toEqual(`input BookInput {
  name: String
}`)
    })
  })
})