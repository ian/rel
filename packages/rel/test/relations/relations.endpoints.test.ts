import { doesNotMatch } from "node:assert"
import Rel, { testServer } from "../../src"

describe("relations endpoints", () => {
  it("should default to having endpoints and type properties", () => {
    const { typeDefs } = server(
      Rel.model(
        "Author",
        {
          name: Rel.string(),
          books: Rel.relation("AUTHORED").to("Book").endpoints(true),
        },
        { timestamps: false }
      ),
      Rel.model(
        "Book",
        {
          title: Rel.string(),
          author: Rel.relation("AUTHORED")
            .to("Author")
            .inbound()
            .singular()
            .endpoints(true),
        },
        { timestamps: false }
      )
    )
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
    expect(typeDefs).toMatch(`BookUnsetAuthor(bookId: UUID!): Author`)
  })

  it("should allow the endpoints to be turned off", () => {
    const { typeDefs } = server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED").to("Book").endpoints(false),
      }),
      Rel.model("Book", {
        title: Rel.string(),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .endpoints(false)
          .inbound()
          .singular(),
      })
    )

    expect(typeDefs).not.toMatch(`AuthorAddBook`)
    expect(typeDefs).not.toMatch(`AuthorRemoveBook`)
    expect(typeDefs).not.toMatch(`BookSetAuthor`)
    expect(typeDefs).not.toMatch(`BookRemoveAuthor`)
  })

  it("should allow the endpoint names to be overridden", () => {
    const { typeDefs } = server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED")
          .to("Book")
          .endpoints({
            add: { name: "AddBook" },
            remove: { name: "RemoveBook" },
          }),
      }),
      Rel.model("Book", {
        title: Rel.string(),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .endpoints({
            add: { name: "SetAuthor" },
            remove: { name: "RemoveAuthor" },
          })
          .inbound()
          .singular(),
      })
    )

    expect(typeDefs).not.toMatch(`AuthorAddBook`)
    expect(typeDefs).toMatch(`AddBook`)
    expect(typeDefs).not.toMatch(`AuthorRemoveBook`)
    expect(typeDefs).toMatch(`RemoveBook`)
    expect(typeDefs).not.toMatch(`BookSetAuthor`)
    expect(typeDefs).toMatch(`SetAuthor`)
    expect(typeDefs).not.toMatch(`BookRemoveAuthor`)
    expect(typeDefs).toMatch(`RemoveAuthor`)
  })

  it("should allow from param to be changed", () => {
    const { typeDefs } = server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED")
          .to("Book")
          .endpoints({
            add: { fromParam: "bookAddFrom" },
            remove: { fromParam: "bookRemoveFrom" },
          }),
      }),
      Rel.model("Book", {
        title: Rel.string(),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .endpoints({
            add: { fromParam: "authorUnsetFrom" },
            remove: { fromParam: "authorUnsetFrom" },
          })
          .inbound()
          .singular(),
      })
    )

    expect(typeDefs).toMatch(
      `AuthorAddBook(bookAddFrom: UUID!, bookId: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `AuthorRemoveBook(bookId: UUID!, bookRemoveFrom: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `BookSetAuthor(authorId: UUID!, authorUnsetFrom: UUID!): Author`
    )
    expect(typeDefs).toMatch(`BookUnsetAuthor(authorUnsetFrom: UUID!): Author`)
  })

  it("should allow to param to be changed", () => {
    const { typeDefs } = server(
      Rel.model("Author", {
        name: Rel.string(),
        books: Rel.relation("AUTHORED")
          .to("Book")
          .endpoints({
            add: { toParam: "bookAddTo" },
            remove: { toParam: "bookRemoveTo" },
          }),
      }),
      Rel.model("Book", {
        title: Rel.string(),
        author: Rel.relation("AUTHORED")
          .to("Author")
          .endpoints({
            add: { toParam: "authorUnsetTo" },
            remove: { toParam: "authorUnsetTo" },
          })
          .inbound()
          .singular(),
      })
    )

    expect(typeDefs).toMatch(
      `AuthorAddBook(authorId: UUID!, bookAddTo: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `AuthorRemoveBook(authorId: UUID!, bookRemoveTo: UUID!): Book`
    )
    expect(typeDefs).toMatch(
      `BookSetAuthor(authorUnsetTo: UUID!, bookId: UUID!): Author`
    )
    expect(typeDefs).toMatch(`BookUnsetAuthor(bookId: UUID!): Author`)
  })
})

const server = (...schema) => {
  return testServer({ log: false })
    .models(...schema)
    .runtime()
}
