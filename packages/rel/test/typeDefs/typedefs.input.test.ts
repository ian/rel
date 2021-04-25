import Rel from "../../src"
import { inputToGQL } from "../../src/typeDefs/input"

const subject = (name, type) => {
  return inputToGQL(name, type)
}

describe("#inputToGQL", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        inputToGQL("BookInput", {
          properties: {
            name: {
              returns: "String",
            },
          },
          returns: "BookInput",
        })
      ).toEqual(`input BookInput {
  name: String
}`)
    })
  })
})
