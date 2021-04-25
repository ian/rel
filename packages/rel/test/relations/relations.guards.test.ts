import Rel, { testServer } from "../../src"

describe("relations guards", () => {
  it("should not guard by default", async () => {
    const { typeDefs } = await server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED").to("Book"),
      }),
      Rel.model("Book", {
        name: Rel.string(),
        author: Rel.relation("AUTHORED").to("Author").inbound().singular(),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  author: Author
}`)
  })

  it("should add guards", async () => {
    const { typeDefs } = await server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED").to("Book"),
      }),
      Rel.model("Book", {
        name: Rel.string().guard(Rel.guard("admin")),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .guard(Rel.guard("admin"))
          .inbound()
          .singular(),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String @admin
  author: Author @admin
}`)
  })
})

const server = (...schema) => {
  return testServer({ log: false })
    .models(...schema)
    .guards(
      Rel.guard("admin").handler(() => {
        throw new Error("GUARDED")
      })
    )
    .start()
}
