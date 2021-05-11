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
  author: Author
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String
}`)
  })

  it("should add guards", async () => {
    const { cypher, graphql } = await server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED").to("Book"),
      }),
      Rel.model("Book", {
        name: Rel.string().guard(guard),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .guard(guard)
          .inbound()
          .singular(),
      }).endpoints({ list: true })
    )

    //     expect(typeDefs).toMatch(`type Book {
    //   id: UUID!
    //   createdAt: DateTime!
    //   updatedAt: DateTime!
    //   name: String @admin
    //   author: Author @admin
    // }`)
    //   })

    const book = await cypher.create("Book", { name: "The Great Gastby" })

    const { data, errors } = await graphql(`
      query {
        ListBooks {
          id
          author {
            id
          }
        }
      }
    `)

    // expect(data.ListBooks).toEqual([{ id: book.id, author: null }])
    // expect(errors).toEqual("foo")
  })
})

const guard = Rel.guard("myGuard").resolve(() => {
  console.log("myGuard")
  throw new Error("GUARDED")
})

const server = (...schema) => {
  return testServer({ log: false })
    .models(...schema)
    .runtime()
}
