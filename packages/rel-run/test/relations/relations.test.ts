import Rel, { testServer } from "../../src"

describe("model relations", () => {
  describe("typeDef", () => {
    it("should have the right signature", () => {
      const { typeDefs } = server()
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
    })
  })

  describe("runtime", () => {
    let author, book

    beforeEach(async (done) => {
      const query = server()

      const { data } = await query(`
      mutation {
        author: CreateAuthor(input: { name: "F. Scott Fitzgerald" }) {
          id
          name
        }
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          id
          title
        }
      }`)
      author = data.author
      book = data.book

      done()
    })

    describe("add", () => {
      it("should allow adding a Book to Author", async (done) => {
        const query = server()
        await query(
          `
        mutation Add($authorId: UUID!, $bookId: UUID!) {
          AuthorAddBook(authorId:$authorId, bookId:$bookId) {
            title
          }
        }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )

        const { data } = await query(
          `
        query Find($authorId: UUID!) {
          author: FindAuthor(id: $authorId) {
            id
            books {
              id
              title
            }
          }
        }`,
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

    describe("remove", () => {
      beforeEach(async (done) => {
        const query = server()
        await query(
          `
      mutation Add($authorId: UUID!, $bookId: UUID!) {
        AuthorAddBook(authorId:$authorId, bookId:$bookId) {
          title
        }
      }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )
        const { data } = await query(
          `
      query Find($authorId: UUID!) {
        author: FindAuthor(id: $authorId) {
          id
          books {
            id
            title
          }
        }
      }`,
          {
            authorId: author.id,
          }
        )

        expect(data).toBeDefined()
        expect(data.author.id).toEqual(author.id)
        expect(data.author.books).toEqual([book])

        done()
      })

      it("should allow removing a Book to Author", async (done) => {
        const query = server()
        await query(
          `
      mutation Remove($authorId: UUID!, $bookId: UUID!) {
        AuthorRemoveBook(authorId:$authorId, bookId:$bookId) {
          title
        }
      }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )

        const { data } = await query(
          `
      query Find($authorId: UUID!) {
        author: FindAuthor(id: $authorId) {
          id
          books {
            id
            title
          }
        }
      }`,
          {
            authorId: author.id,
          }
        )

        expect(data).toBeDefined()
        expect(data.author.id).toEqual(author.id)
        expect(data.author.books).toEqual([])

        done()
      })
    })

    describe("set", () => {
      it("should allow setting a Book's Author", async (done) => {
        const query = server()
        await query(
          `
        mutation Set($authorId: UUID!, $bookId: UUID!) {
          BookSetAuthor(bookId:$bookId, authorId:$authorId) {
            name
          }
        }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )

        const { data, errors } = await query(
          `
        query Find($bookId: UUID!) {
          book: FindBook(id: $bookId) {
            id
            author {
              id
              name
            }
          }
        }`,
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

    describe("unset aka remove singular", () => {
      beforeEach(async (done) => {
        const query = server()
        await query(
          `
        mutation Set($authorId: UUID!, $bookId: UUID!) {
          BookSetAuthor(bookId:$bookId, authorId:$authorId) {
            name
          }
        }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )

        const { data, errors } = await query(
          `
        query Find($bookId: UUID!) {
          book: FindBook(id: $bookId) {
            id
            author {
              id
              name
            }
          }
        }`,
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

      it("should allow unsetting a Book's Author", async (done) => {
        const query = server()
        await query(
          `
        mutation Set($authorId: UUID!, $bookId: UUID!) {
          BookRemoveAuthor(bookId:$bookId, authorId:$authorId) {
            name
          }
        }`,
          {
            authorId: author.id,
            bookId: book.id,
          }
        )

        const { data, errors } = await query(
          `
        query Find($bookId: UUID!) {
          book: FindBook(id: $bookId) {
            id
            author {
              id
              name
            }
          }
        }`,
          {
            bookId: book.id,
          }
        )

        expect(errors).not.toBeDefined()
        expect(data).toBeDefined()
        expect(data.book.id).toEqual(book.id)
        expect(data.book.author).toEqual(null)

        done()
      })
    })
  })
})

const server = () => {
  return testServer(
    {
      schema: {
        Author: Rel.model(
          { name: Rel.string(), books: Rel.relation("AUTHORED").to("Book") },
          { timestamps: false }
        ),
        Book: Rel.model(
          {
            title: Rel.string(),
            author: Rel.relation("AUTHORED", "Author").inbound().singular(),
          },
          { timestamps: false }
        ),
      },
    },
    {
      // log: true,
    }
  )
}
