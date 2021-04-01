import { model, string } from "../../src"
import { makeServer } from "@reldb/testing"

describe("#model", () => {
  const server = (schema) => {
    return makeServer(
      {
        schema,
      },
      {
        // log: true,
      }
    )
  }

  describe("GQL", () => {
    it("should set id, createdAt, and updatedAt by default on types", () => {
      const { typeDefs } = server({
        Book: model().fields({ name: string() }),
      })

      expect(typeDefs).toMatch(`input BookInput {
  name: String
}`)
      expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
}
`)
    })

    it("should allow id field to be overridden", () => {
      const { typeDefs } = server({
        Book: model({ id: false }).fields({ name: string() }),
      })

      expect(typeDefs).toMatch(`input BookInput {
  name: String
}`)
      expect(typeDefs).toMatch(`type Book {
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
}
`)
    })

    it("should allow timestamps field to be overridden", () => {
      const { typeDefs } = server({
        Book: model({ timestamps: false }).fields({
          name: string(),
        }),
      })
      expect(typeDefs).toMatch(`input BookInput {
  name: String
}`)
      expect(typeDefs).toMatch(`type Book {
  id: UUID!
  name: String
}
`)
    })
  })
})
