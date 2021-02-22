import { string } from "../../fields"
import { Direction, Relation } from "../../types"
import { generateObjectRelation } from "./relations"

describe("generateObjectRelation", () => {
  const subject = (relation: Relation) => {
    return generateObjectRelation(relation)
  }

  describe("outbound", () => {
    it("should return a relation", () => {
      const _subject = subject({
        from: {
          label: "Actor",
        },
        to: {
          label: "Movie",
        },
        rel: {
          label: "ACTED_IN",
        },
      })

      expect(_subject.returns).toBe("[Movie]!")
      expect(_subject.resolver).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject({
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
      })

      expect(_subject.returns).toBe("Publisher")
      expect(_subject.resolver).toBeDefined()
    })
  })

  describe("inbound", () => {
    it("should return a relation", () => {
      const _subject = subject({
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
      })

      expect(_subject.returns).toBe("[Book]!")
      expect(_subject.resolver).toBeDefined()
    })

    it("should change the signature on singular", () => {
      const _subject = subject({
        from: {
          label: "Publisher",
        },
        to: {
          label: "Book",
        },
        rel: {
          label: "PUBLISHED_BY",
        },
        direction: Direction.IN,
        singular: true,
      })

      expect(_subject.returns).toBe("Book")
      expect(_subject.resolver).toBeDefined()
    })
  })
})
