import Rel, { testServer } from "../../src"

describe("relations resolvers", () => {
  let author, book
  beforeEach(async (done) => {
    const { graphql } = server()

    const { data } = await graphql(`
      mutation {
        author: CreateAuthor(input: { name: "F. Scott Fitzgerald" }) {
          id
          name
        }
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          id
          title
        }
      }
    `)

    author = data.author
    book = data.book

    await graphql(
      `
        mutation Add($authorId: UUID!, $bookId: UUID!) {
          AuthorAddBook(authorId: $authorId, bookId: $bookId) {
            title
          }
        }
      `,
      {
        authorId: author.id,
        bookId: book.id,
      }
    )

    done()
  })

  it("should default to the list resolver", async (done) => {
    const { graphql } = server()
    const { data } = await graphql(
      `
        query Find($authorId: UUID!) {
          author: FindAuthor(where: { id: $authorId }) {
            books {
              id
            }
          }
        }
      `,
      { authorId: author.id }
    )

    expect(data.author.books).toEqual([{ id: book.id }])

    done()
  })

  it("should allow resolver to be overridden", async (done) => {
    const { graphql, typeDefs } = server(() => [{ id: "FAKE" }])
    const { data } = await graphql(
      `
        query Find($authorId: UUID!) {
          author: FindAuthor(where: { id: $authorId }) {
            books {
              id
            }
          }
        }
      `,
      { authorId: author.id }
    )

    expect(data.author.books).toEqual([{ id: "FAKE" }])

    done()
  })
})

const server = (resolver?) => {
  return testServer({ log: false })
    .models(
      Rel.model(
        "Author",
        {
          name: Rel.string(),
          books: Rel.relation("AUTHORED")
            .to("Book")
            .resolve(resolver)
            .endpoints(true),
        },
        { timestamps: false }
      ).endpoints(true),
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
      ).endpoints(true)
    )
    .runtime()
}
