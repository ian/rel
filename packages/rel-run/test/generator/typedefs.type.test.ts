import Rel from "../../src"
import { outputToGQL } from "../../src/typeDefs"

const subject = (name, type) => {
  return outputToGQL(name, type)
}

describe("#outputToGQL", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("Book", {
          name: Rel.string(),
        })
      ).toEqual(`type Book {
  name: String
}`)
    })
  })
})
