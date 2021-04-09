import Rel, { testServer } from "../../src"

describe("relations guards", () => {
  it("should not guard by default", async () => {
    const { typeDefs } = await server({
      Author: Rel.model({
        name: Rel.string(),
        books: Rel.relation("AUTHORED", "Book"),
      }),
      Book: Rel.model({
        name: Rel.string(),
        author: Rel.relation("AUTHORED", "Author").inbound().singular(),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  author: Author
}`)
  })

  it("should add guards", async () => {
    const { typeDefs } = await server({
      Author: Rel.model({
        name: Rel.string(),
        books: Rel.relation("AUTHORED", "Book"),
      }),
      Book: Rel.model({
        name: Rel.string(),
        author: Rel.relation("AUTHORED", "Author")
          .guard("admin")
          .inbound()
          .singular(),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
  author: Author @admin
}`)
  })
})

const server = (schema) => {
  return testServer({ log: false })
    .schema(schema)
    .guards({
      admin: {
        resolver: () => {
          throw new Error("GUARDED")
        },
      },
    })
    .start()
}
