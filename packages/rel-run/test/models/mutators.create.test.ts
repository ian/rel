import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer(
      {
        schema,
      },
      {
        // log: true,
      }
    )
  }

  describe("typeDef", () => {
    it("should have the right signature", () => {
      const { typeDefs } = server({
        Book: Rel.model().fields({ title: Rel.string() }).mutators(),
      })
      expect(typeDefs).toMatch(`CreateBook(input: BookInput!): Book`)
    })
  })

  describe("#mutators()", () => {
    it("should generate the list endpoint when mutators() is called with no params", () => {
      const { typeDefs } = server({
        Book: Rel.model().fields({ title: Rel.string() }).mutators(),
      })

      expect(typeDefs).toMatch(`CreateBook`)
    })

    it("should generate the list endpoint when mutators(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model().fields({ title: Rel.string() }).mutators(true),
      })

      expect(typeDefs).toMatch(`CreateBook`)
    })

    it("should generate the list endpoint when mutators(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ create: true }),
      })

      expect(typeDefs).toMatch(`CreateBook`)
    })

    it("should NOT generate the list endpoint when mutators(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ create: false }),
      })

      expect(typeDefs).not.toMatch(`CreateBook`)
    })

    it("should NOT generate the list endpoint when mutators(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ create: false }),
      })

      expect(typeDefs).not.toMatch(`CreateBook`)
    })
  })

  describe("runtime", () => {
    const query = server({
      Book: Rel.model().fields({ title: Rel.string() }).mutators(),
    })

    it("should find the Book", async (done) => {
      const { data } = await query(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
        }
      }
    `)

      expect(data?.book.title).toEqual("The Great Gatsby")

      done()
    })

    it("should error when no input is specified", async (done) => {
      const { data, errors } = await query(`
      mutation {
        book: CreateBook {
          title
        }
      }
    `)

      expect(data?.book).not.toBeDefined()
      expect(errors.length).toBeGreaterThanOrEqual(1)

      done()
    })
  })
})