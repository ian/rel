import Rel from "../../src"
import { inputToGQL } from "../../src/typeDefs/input"

const subject = (name, type) => {
  return inputToGQL(name, type)
}

describe("#inputToGQL", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("BookInput", {
          name: Rel.string(),
        })
      ).toEqual(`input BookInput {
  name: String
}`)
    })
  })
})
