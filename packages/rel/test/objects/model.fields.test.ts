import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer({ log: false }).models(schema).runtime()
  }

  describe("GQL", () => {
    it.only("should set id, createdAt, and updatedAt by default on types", () => {
      const { typeDefs } = server(Rel.model("Book", { name: Rel.string() }))

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
      const { typeDefs } = server(
        Rel.model("Book", { name: Rel.string() }, { id: false })
      )

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
      const { typeDefs } = server(
        Rel.model(
          "Book",
          {
            name: Rel.string(),
          },
          { timestamps: false }
        )
      )
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
