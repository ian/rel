import { string } from "../../fields"
import { generateType } from "./type"

const subject = (name, type) => {
  return generateType(name, type)
}

describe("#generateType", () => {
  describe("ReducedTypeDef as string", () => {
    it("should generate the type name", () => {
      expect(
        subject("Book", {
          name: {
            typeDef: "name: String",
          },
        })
      ).toEqual(`type Book {
  name: String
}`)
    })
  })

  describe("ReducedTypeDef as fields", () => {
    it("should generate the type name", () => {
      expect(
        subject("Book", {
          name: {
            typeDef: {
              params: null,
              returns: string(),
            },
          },
        })
      ).toEqual(`type Book {
  name: String
}`)
    })
  })
})
