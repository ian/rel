import { type, array } from "../../src/fields"
import { Direction, Relations } from "../../src/types"
import { reduceRelations } from "../../src/reducer/models/relations"

describe("#reduceRelations", () => {
  const subject = (label: string, relations: Relations) => {
    return reduceRelations(label, relations)
  }

  describe("outbound", () => {
    it("should return a relation", () => {
      const _subject = subject("Actor", {
        movies: {
          from: {
            label: "Actor",
          },
          to: {
            label: "Movie",
          },
          rel: {
            label: "ACTED_IN",
          },
        },
      })

      expect(_subject.types.Actor.movies).toBeDefined()
      expect(_subject.types.Actor.movies.typeDef.returns.toGQL()).toBe(
        array(type("Movie")).required().toGQL()
      )
      expect(_subject.types.Actor.movies.resolver).toBeDefined()

      expect(_subject.endpoints.ActorAddMovie).toBeDefined()
      expect(_subject.endpoints.ActorRemoveMovie).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject("Book", {
        publisher: {
          from: {
            label: "Book",
          },
          to: {
            label: "Publisher",
          },
          rel: {
            label: "PUBLISHED_BY",
          },
          singular: true,
        },
      })

      expect(_subject.types.Book.publisher).toBeDefined()
      expect(_subject.types.Book.publisher.typeDef.returns.toGQL()).toBe(
        type("Publisher").toGQL()
      )
      expect(_subject.types.Book.publisher.resolver).toBeDefined()
    })
  })

  describe("inbound", () => {
    it("should return a relation", () => {
      const _subject = subject("Author", {
        books: {
          from: {
            label: "Author",
          },
          to: {
            label: "Book",
          },
          rel: {
            label: "AUTHORED",
          },
          direction: Direction.IN,
        },
      })

      expect(_subject.types.Author.books).toBeDefined()
      expect(_subject.types.Author.books.typeDef.returns.toGQL()).toBe(
        array(type("Book")).required().toGQL()
      )
      expect(_subject.types.Author.books.resolver).toBeDefined()

      expect(_subject.endpoints.AuthorAddBook).toBeDefined()
      expect(_subject.endpoints.AuthorRemoveBook).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject("Book", {
        publisher: {
          from: {
            label: "Book",
          },
          to: {
            label: "Publisher",
          },
          rel: {
            label: "PUBLISHED_BY",
          },
          direction: Direction.OUT,
          singular: true,
        },
      })

      expect(_subject.types.Book.publisher).toBeDefined()
      expect(_subject.types.Book.publisher.typeDef.returns.toGQL()).toBe(
        type("Publisher").toGQL()
      )
      expect(_subject.types.Book.publisher.resolver).toBeDefined()

      expect(_subject.endpoints.BookSetPublisher).toBeDefined()
      expect(_subject.endpoints.BookRemovePublisher).toBeDefined()
    })
  })
})
