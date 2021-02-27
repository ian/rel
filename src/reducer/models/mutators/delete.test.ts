import { Reducible } from "~/types"
import { string, uuid } from "~/fields"
import { generateDelete } from "./delete"

const subject = (mutator) => {
  return generateDelete("Book", mutator, { title: string() }) as Reducible
}

describe("generateDelete", () => {
  it("should NOT generate any reducible when mutator is null", () => {
    const _subject = subject(null)
    expect(_subject).toBe(null)
  })

  it("should NOT generate any reducible when mutator is false", () => {
    const _subject = subject(false)
    expect(_subject).toBe(null)
  })

  describe("inputs", () => {
    it("should NOT generate inputs when mutator true", () => {
      const _subject = subject(true)
      expect(typeof _subject).toBe("object")
      expect(_subject.inputs).not.toBeDefined()
    })

    it("should NOT generate inputs when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.inputs).not.toBeDefined()
    })
  })

  describe("types", () => {
    it("should generate a reducible with an input when mutator true", () => {
      const _subject = subject(true)

      expect(_subject.types.Mutation.DeleteBook.typeDef).toBeDefined()
      expect(_subject.types.Mutation.DeleteBook.typeDef.params).toBeDefined()
    })

    it("should generate a reducible with an input when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.types.Mutation.DeleteBook.typeDef).toBeDefined()
      expect(_subject.types.Mutation.DeleteBook.typeDef.params).toBeDefined()
    })
  })

  describe("resolvers", () => {
    it("should generate a reducible with an input when mutator true", () => {
      const _subject = subject(true)

      expect(_subject.resolvers.Mutation.DeleteBook).toBeDefined()
    })

    it("should generate a reducible with an input when mutator is an object", () => {
      const _subject = subject({})

      expect(_subject.resolvers.Mutation.DeleteBook).toBeDefined()
    })
  })

  describe("guard", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(typeof _subject).toBe("object")

      expect(_subject.types.Mutation.DeleteBook.typeDef.guard).toEqual("admin")
    })
  })

  describe("params", () => {
    it("should allow id to be specified", () => {
      const _subject = subject({ title: string() })

      expect(
        JSON.stringify(_subject.types.Mutation.DeleteBook.typeDef.params)
      ).toBe(JSON.stringify({ id: uuid() }))
    })
  })
})
