import { Reducible } from "~/types"
import { string, uuid, type } from "~/fields"
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

  it("should generate a reducible when mutator is true", () => {
    const _subject = subject(true)
    expect(typeof _subject).toBe("object")
    expect(_subject.inputs).not.toBeDefined()
    expect(_subject.types.Mutation.DeleteBook).toBeDefined()
    expect(_subject.types.Mutation.DeleteBook.params).toBeDefined()
    expect(_subject.resolvers.Mutation.DeleteBook).toBeDefined()
  })

  it("should generate a reducible when mutator is an object", () => {
    const _subject = subject({})
    expect(typeof _subject).toBe("object")
    expect(_subject.types.Mutation.DeleteBook).toBeDefined()
    expect(_subject.types.Mutation.DeleteBook.params).toBeDefined()
    expect(_subject.resolvers.Mutation.DeleteBook).toBeDefined()
  })

  describe("mutator options", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(typeof _subject).toBe("object")

      expect(_subject.types.Mutation.DeleteBook.guard).toEqual("admin")
    })

    it("should allow findBy to be specified", () => {
      const findBy = { title: string() }
      const _subject = subject({ findBy })

      expect(JSON.stringify(_subject.types.Mutation.DeleteBook.params)).toBe(
        JSON.stringify({ id: uuid() })
      )
    })
  })
})
