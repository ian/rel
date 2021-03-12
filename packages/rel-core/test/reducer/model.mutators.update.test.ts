import { Reducible } from "../../src/types"
import { string, uuid, type } from "../../src/fields"
import { generateUpdate } from "../../src/reducer/update"

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
    it("should generate an endpoint when mutator is true", () => {
      const _subject = subject(true)
      expect(_subject.endpoints.UpdateBook).toBeDefined()
    })

    it("should generate an endpoint when mutator is an object", () => {
      const _subject = subject({})
      expect(_subject.endpoints.UpdateBook).toBeDefined()
    })
  })

  describe("resolvers", () => {
    it("should generate a resolver when mutator is true", () => {
      const _subject = subject(true)
      expect(_subject.endpoints.UpdateBook.resolver).toBeDefined()
    })

    it("should generate a resolver when mutator is an object", () => {
      const _subject = subject({})
      expect(_subject.endpoints.UpdateBook.resolver).toBeDefined()
    })
  })

  describe("guard", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(typeof _subject).toBe("object")

      expect(_subject.endpoints.UpdateBook.typeDef.guard).toEqual("admin")
    })
  })

  describe("params", () => {
    it("should allow findBy to be specified", () => {
      const _subject = subject({ title: string() })

      expect(JSON.stringify(_subject.endpoints.UpdateBook.typeDef.params)).toBe(
        JSON.stringify({ id: uuid(), input: type("BookInput") })
      )
    })
  })
})
