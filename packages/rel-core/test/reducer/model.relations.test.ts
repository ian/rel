import { Fields, Rel } from "../../src"
import { Direction, Relations } from "../../src/types"
import { reduceRelations } from "../../src/reducer/relations"
const { type, array } = Fields

describe("#reduceRelations", () => {
  const subject = (label: string, relations: Relations) => {
    return reduceRelations(label, relations)
  }

  describe("outbound", () => {
    it("should return a relation", () => {
      const _subject = subject("Actor", {
        movies: Rel("ACTED_IN").to("Movie"),
      })

      expect(_subject.outputs.Actor.movies).toBeDefined()
      expect(_subject.outputs.Actor.movies.returns.toGQL()).toBe(
        array(type("Movie")).required().toGQL()
      )
      expect(_subject.outputs.Actor.movies.resolver).toBeDefined()

      expect(_subject.endpoints.ActorAddMovie).toBeDefined()
      expect(_subject.endpoints.ActorRemoveMovie).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject("Book", {
        publisher: Rel("PUBLISHED_BY").to("Publisher").singular(),
      })

      expect(_subject.outputs.Book.publisher).toBeDefined()
      expect(_subject.outputs.Book.publisher.returns.toGQL()).toBe(
        type("Publisher").toGQL()
      )
      expect(_subject.outputs.Book.publisher.resolver).toBeDefined()
    })
  })

  describe("inbound", () => {
    it("should return a relation", () => {
      const _subject = subject("Author", {
        books: Rel("AUTHORED").to("Book").direction(Direction.IN),
      })

      expect(_subject.outputs.Author.books).toBeDefined()
      expect(_subject.outputs.Author.books.returns.toGQL()).toBe(
        array(type("Book")).required().toGQL()
      )
      expect(_subject.outputs.Author.books.resolver).toBeDefined()

      expect(_subject.endpoints.AuthorAddBook).toBeDefined()
      expect(_subject.endpoints.AuthorRemoveBook).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject("Book", {
        publisher: Rel("PUBLISHED_BY")
          .to("Publisher")
          .singular()
          .direction(Direction.OUT),
      })

      expect(_subject.outputs.Book.publisher).toBeDefined()
      expect(_subject.outputs.Book.publisher.returns.toGQL()).toBe(
        type("Publisher").toGQL()
      )
      expect(_subject.outputs.Book.publisher.resolver).toBeDefined()

      expect(_subject.endpoints.BookSetPublisher).toBeDefined()
      expect(_subject.endpoints.BookRemovePublisher).toBeDefined()
    })
  })
})
