import { string, type } from "@reldb/meta"
import { Reducible } from "@reldb/types"
import { generateCreate } from "../../src/reducer/create"

const subject = (mutator) => {
  return generateCreate("Book", mutator, {
    title: string(),
  }) as Reducible
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
      expect(_subject.endpoints.CreateBook).toBeDefined()
    })

    it("should generate a reducible when mutator is an object", () => {
      const _subject = subject({})
      expect(_subject.endpoints.CreateBook).toBeDefined()
    })
  })

  describe("resolvers", () => {
    it("should generate a resolver when mutator is true", () => {
      const _subject = subject(true)
      expect(_subject.endpoints.CreateBook.resolver).toBeDefined()
    })

    it("should generate a resolver when mutator is an object", () => {
      const _subject = subject({})
      expect(_subject.endpoints.CreateBook.resolver).toBeDefined()
    })
  })

  describe("guard", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })

      expect(typeof _subject).toBe("object")
      expect(_subject.endpoints.CreateBook.guard).toEqual("admin")
    })
  })

  describe("params", () => {
    it("should allow id to be specified", () => {
      const _subject = subject({ title: string() })

      expect(JSON.stringify(_subject.endpoints.CreateBook.params)).toBe(
        JSON.stringify({ input: type("BookInput") })
      )
    })
  })
})
