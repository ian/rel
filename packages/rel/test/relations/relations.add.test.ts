import Rel, { testServer } from "../../src"

describe("relations guards", () => {
  let author, book

  beforeEach(async (done) => {
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

    done()
  })

  describe("add", () => {
    it("should allow adding a Book to Author", async (done) => {
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

      const { data } = await graphql(
        `
          query Find($authorId: UUID!) {
            author: FindAuthor(where: { id: $authorId }) {
              id
              books {
                id
                title
              }
            }
          }
        `,
        {
          authorId: author.id,
        }
      )

      expect(data).toBeDefined()
      expect(data.author.id).toEqual(author.id)
      expect(data.author.books).toEqual([book])

      done()
    })
  })

  describe("set", () => {
    it("should allow setting a Book's Author", async (done) => {
      const set = await graphql(
        `
          mutation Set($authorId: UUID!, $bookId: UUID!) {
            BookSetAuthor(bookId: $bookId, authorId: $authorId) {
              name
            }
          }
        `,
        {
          authorId: author.id,
          bookId: book.id,
        }
      )

      expect(set.errors).toBeUndefined()
      expect(set.data.BookSetAuthor).toEqual({ name: author.name })

      const { data, errors } = await graphql(
        `
          query Find($bookId: UUID!) {
            book: FindBook(where: { id: $bookId }) {
              id
              author {
                id
                name
              }
            }
          }
        `,
        {
          bookId: book.id,
        }
      )

      expect(errors).not.toBeDefined()
      expect(data).toBeDefined()
      expect(data.book.id).toEqual(book.id)
      expect(data.book.author).toEqual(author)

      done()
    })
  })
})

const server = () => {
  return testServer({ log: false })
    .models(
      Rel.model(
        "Author",
        {
          name: Rel.string(),
          books: Rel.relation("AUTHORED").to("Book").endpoints(true),
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

const { graphql, typeDefs } = server()