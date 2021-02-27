import { Reducible } from "~/types"
import { string } from "~/fields"
import { type } from "../../../fields"
import { generateCreate } from "./create"

const subject = (mutator) => {
  return generateCreate("Book", mutator, { title: string() }) as Reducible
}

describe("generateCreate", () => {
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
      expect(_subject.types.Mutation.CreateBook.typeDef).toBeDefined()
      expect(_subject.types.Mutation.CreateBook.typeDef.params).toBeDefined()
    })

    it("should generate a reducible when mutator is an object", () => {
      const _subject = subject({})
      expect(typeof _subject).toBe("object")
      expect(_subject.types.Mutation.CreateBook.typeDef).toBeDefined()
      expect(_subject.types.Mutation.CreateBook.typeDef.params).toBeDefined()
    })
  })

  describe("inputs", () => {
    it("should generate a reducible with an input when mutator true", () => {
      const _subject = subject(true)

      expect(_subject.inputs.BookInput).toBeDefined()
      expect(JSON.stringify(_subject.inputs.BookInput)).toBe(
        JSON.stringify({
          title: { typeDef: { returns: string() } },
        })
      )
    })

    it("should generate a reducible with an input when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.inputs.BookInput).toBeDefined()
      expect(JSON.stringify(_subject.inputs.BookInput)).toBe(
        JSON.stringify({
          title: {
            typeDef: {
              returns: string(),
            },
          },
        })
      )
    })
  })

  describe("resolvers", () => {
    it("should generate a reducible with a resolver when mutator is true", () => {
      const _subject = subject(true)
      expect(_subject.resolvers.Mutation.CreateBook).toBeDefined()
    })

    it("should generate a reducible with a resolver when mutator is an object", () => {
      const _subject = subject({})
      expect(_subject.resolvers.Mutation.CreateBook).toBeDefined()
    })
  })

  describe("guard", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })

      expect(typeof _subject).toBe("object")
      expect(_subject.types.Mutation.CreateBook.typeDef.guard).toEqual("admin")
    })
  })

  describe("params", () => {
    it("should allow id to be specified", () => {
      const _subject = subject({ title: string() })

      expect(
        JSON.stringify(_subject.types.Mutation.CreateBook.typeDef.params)
      ).toBe(JSON.stringify({ input: type("BookInput") }))
    })
  })
})
