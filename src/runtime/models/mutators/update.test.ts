import { Reducible } from "~/types"
import { string, uuid, type } from "~/fields"
import { generateUpdate } from "./update"

const subject = (mutator) => {
  return generateUpdate("Book", mutator, { title: string() }) as Reducible
}

describe("generateUpdate", () => {
  it("should NOT generate any reducible when mutator is null", () => {
    const _subject = subject(null)
    expect(_subject).toBe(null)
  })

  it("should NOT generate any reducible when mutator is false", () => {
    const _subject = subject(false)
    expect(_subject).toBe(null)
  })

  describe("types", () => {
    it("should generate a reducible when mutator is true", () => {
      const _subject = subject(true)
      expect(typeof _subject).toBe("object")
      expect(_subject.types.Mutation.UpdateBook).toBeDefined()
      expect(_subject.types.Mutation.UpdateBook.params).toBeDefined()
      expect(_subject.resolvers.Mutation.UpdateBook).toBeDefined()
    })

    it("should generate a reducible when mutator is an object", () => {
      const _subject = subject({})
      expect(typeof _subject).toBe("object")
      expect(_subject.types.Mutation.UpdateBook).toBeDefined()
      expect(_subject.types.Mutation.UpdateBook.params).toBeDefined()
      expect(_subject.resolvers.Mutation.UpdateBook).toBeDefined()
    })
  })

  describe("inputs", () => {
    it("should generate an input when mutator true", () => {
      const _subject = subject(true)

      expect(_subject.inputs.BookInput).toBeDefined()
      expect(JSON.stringify(_subject.inputs.BookInput)).toBe(
        JSON.stringify({
          title: { returns: string() },
        })
      )
    })

    it("should generate an input when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.inputs.BookInput).toBeDefined()
      expect(JSON.stringify(_subject.inputs.BookInput)).toBe(
        JSON.stringify({
          title: { returns: string() },
        })
      )
    })
  })

  describe("resolvers", () => {
    it("should generate a resolver when mutator is true", () => {
      const _subject = subject(true)

      expect(_subject.resolvers.Mutation.UpdateBook).toBeDefined()
    })

    it("should generate a resolver when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.resolvers.Mutation.UpdateBook).toBeDefined()
    })
  })

  describe("guard", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(typeof _subject).toBe("object")

      expect(_subject.types.Mutation.UpdateBook.guard).toEqual("admin")
    })
  })

  describe("params", () => {
    it("should allow findBy to be specified", () => {
      const _subject = subject({ title: string() })

      expect(JSON.stringify(_subject.types.Mutation.UpdateBook.params)).toBe(
        JSON.stringify({ id: uuid(), input: type("BookInput") })
      )
    })
  })
})
