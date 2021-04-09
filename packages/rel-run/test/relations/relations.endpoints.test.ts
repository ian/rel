import { doesNotMatch } from "node:assert"
import Rel, { testServer } from "../../src"

describe("relations endpoints", () => {
  it("should default to having endpoints and type properties", async (done) => {
    const { typeDefs } = await server({
      Author: Rel.model(
        { name: Rel.string(), books: Rel.relation("AUTHORED", "Book") },
        { timestamps: false }
      ),
      Book: Rel.model(
        {
          title: Rel.string(),
          author: Rel.relation("AUTHORED", "Author").inbound().singular(),
        },
        { timestamps: false }
      ),
    })
    expect(typeDefs).toMatch(`type Author {
  id: UUID!
  name: String
  books: [Book]!
}`)
    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  title: String
  author: Author
}`)
    expect(typeDefs).toMatch(
      `AuthorAddBook(authorId: UUID!, bookId: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `AuthorRemoveBook(authorId: UUID!, bookId: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `BookSetAuthor(authorId: UUID!, bookId: UUID!): Author`
    )
    expect(typeDefs).toMatch(
      `BookRemoveAuthor(authorId: UUID!, bookId: UUID!): Author`
    )

    done()
  })

  it("should allow the endpoints to be turned off", async (done) => {
    const { typeDefs } = await server({
      Author: Rel.model({
        name: Rel.string(),
        books: Rel.relation("AUTHORED", "Book", { endpoints: false }),
      }),
      Book: Rel.model({
        title: Rel.string(),
        author: Rel.relation("AUTHORED", "Author", { endpoints: false })
          .inbound()
          .singular(),
      }),
    })

    expect(typeDefs).not.toMatch(`AuthorAddBook`)
    expect(typeDefs).not.toMatch(`AuthorRemoveBook`)
    expect(typeDefs).not.toMatch(`BookSetAuthor`)
    expect(typeDefs).not.toMatch(`BookRemoveAuthor`)

    done()
  })

  it("should allow the endpoint names to be overridden", async (done) => {
    const { typeDefs } = await server({
      Author: Rel.model({
        name: Rel.string(),
        books: Rel.relation("AUTHORED", "Book", {
          endpoints: { add: "AddBook", remove: "RemoveBook" },
        }),
      }),
      Book: Rel.model({
        title: Rel.string(),
        author: Rel.relation("AUTHORED", "Author", {
          endpoints: { add: "SetAuthor", remove: "RemoveAuthor" },
        })
          .inbound()
          .singular(),
      }),
    })

    expect(typeDefs).not.toMatch(`AuthorAddBook`)
    expect(typeDefs).toMatch(`AddBook`)
    expect(typeDefs).not.toMatch(`AuthorRemoveBook`)
    expect(typeDefs).toMatch(`RemoveBook`)
    expect(typeDefs).not.toMatch(`BookSetAuthor`)
    expect(typeDefs).toMatch(`SetAuthor`)
    expect(typeDefs).not.toMatch(`BookRemoveAuthor`)
    expect(typeDefs).toMatch(`RemoveAuthor`)

    done()
  })
})

const server = (schema) => {
  return testServer({ log: false }).schema(schema).start()
}
