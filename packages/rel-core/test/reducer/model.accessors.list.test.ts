import { string, int } from "../../src/fields"
import { generateList } from "../../src/reducer/list"

const subject = (accessor) => {
  return generateList("Book", accessor, {})
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
    expect(_subject.endpoints.ListBooks).toBeDefined()
  })

  it("should generate a reducible when accessor is an object", () => {
    const _subject = subject({})
    expect(_subject.endpoints.ListBooks).toBeDefined()
  })

  describe("accessor options", () => {
    it("should allow guard to be specified", () => {
      const _subject = subject({ guard: "admin" })
      expect(_subject.endpoints.ListBooks.typeDef.guard).toBe("admin")
    })

    it("should allow findBy to be specified", () => {
      const findBy = { title: string() }
      const _subject = subject({ findBy })
      expect(JSON.stringify(_subject.endpoints.ListBooks.typeDef.params)).toBe(
        JSON.stringify({ limit: int(), skip: int(), order: string() })
      )
    })
  })
})
