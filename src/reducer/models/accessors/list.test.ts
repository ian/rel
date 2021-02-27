import { string, int } from "~/fields"
import { generateList } from "./list"

const subject = (accessor) => {
  return generateList("Book", accessor)
}

describe("generateList", () => {
  it("should NOT generate any reducible when accessor is null", () => {
    const _subject = subject(null)
    expect(_subject).toBe(null)
  })

  it("should NOT generate any reducible when accessor is false", () => {
    const _subject = subject(false)
    expect(_subject).toBe(null)
  })

  it("should generate a reducible when accessor is true", () => {
    const _subject = subject(true)
    expect(typeof _subject).toBe("object")
    expect(_subject.types.Query.ListBooks.typeDef).toBeDefined()
    expect(_subject.types.Query.ListBooks.typeDef.params).toBeDefined()
    expect(_subject.resolvers.Query.ListBooks).toBeDefined()
  })

  it("should generate a reducible when accessor is an object", () => {
    const _subject = subject({})
    expect(typeof _subject).toBe("object")
    expect(_subject.types.Query.ListBooks.typeDef).toBeDefined()
    expect(_subject.types.Query.ListBooks.typeDef.params).toBeDefined()
    expect(_subject.resolvers.Query.ListBooks).toBeDefined()
  })

  describe("accessor options", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(typeof _subject).toBe("object")
      expect(_subject.types.Query.ListBooks).toBeDefined()
      expect(_subject.types.Query.ListBooks.typeDef.params).toBeDefined()
      expect(_subject.types.Query.ListBooks.typeDef.guard).toEqual("admin")
      expect(_subject.resolvers.Query.ListBooks).toBeDefined()
    })

    it("should allow findBy to be specified", () => {
      const findBy = { title: string() }
      const _subject = subject({ findBy })
      expect(typeof _subject).toBe("object")
      expect(_subject.types.Query.ListBooks).toBeDefined()
      expect(
        JSON.stringify(_subject.types.Query.ListBooks.typeDef.params)
      ).toBe(JSON.stringify({ limit: int(), skip: int(), order: string() }))
    })
  })
})
