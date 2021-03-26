import { type, array, rel } from "@reldb/meta"
import { Direction, Relations } from "@reldb/types"
import { reduceRelations } from "../../src/reducer/relations"

describe("#reduceRelations", () => {
  const subject = (label: string, relations: Relations) => {
    return reduceRelations(label, relations)
  }

  describe("outbound", () => {
    it("should return a relation", () => {
      const _subject = subject("Actor", {
        movies: rel("ACTED_IN").to("Movie"),
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
        publisher: rel("PUBLISHED_BY").to("Publisher").singular(),
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
        books: rel("AUTHORED").to("Book").direction(Direction.IN),
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
        publisher: rel("PUBLISHED_BY")
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
