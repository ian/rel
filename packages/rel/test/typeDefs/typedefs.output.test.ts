import Rel from "../../src"
import { outputToGQL } from "../../src/typeDefs"

describe("#outputToGQL", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        outputToGQL("Book", {
          properties: {
            name: {
              returns: "String",
            },
          },
          returns: "Book",
        })
      ).toEqual(`type Book {
  name: String
}`)
    })
  })
})
