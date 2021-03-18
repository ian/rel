import { Fields } from "../../src"
import { generateType } from "../../src/generator/type"

const subject = (name, type) => {
  return generateType(name, type)
}

describe("#generateType", () => {
  describe("fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("Book", {
          name: {
            params: null,
            returns: Fields.string(),
          },
        })
      ).toEqual(`type Book {
  name: String
}`)
    })
  })
})
