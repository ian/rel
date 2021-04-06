import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer(
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
        Book: Rel.model({ name: Rel.string() }),
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
        Book: Rel.model({ name: Rel.string() }, { id: false }),
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
        Book: Rel.model(
          {
            name: Rel.string(),
          },
          { timestamps: false }
        ),
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
