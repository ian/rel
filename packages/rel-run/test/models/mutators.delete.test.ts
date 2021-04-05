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
      expect(typeDefs).toMatch(`DeleteBook(id: UUID!): Book`)
    })
  })

  describe("#mutators()", () => {
    it("should generate the list endpoint when mutators() is called with no params", () => {
      const { typeDefs } = server({
        Book: Rel.model().fields({ title: Rel.string() }).mutators(),
      })

      expect(typeDefs).toMatch(`DeleteBook`)
    })

    it("should generate the list endpoint when mutators(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model().fields({ title: Rel.string() }).mutators(true),
      })

      expect(typeDefs).toMatch(`DeleteBook`)
    })

    it("should generate the list endpoint when mutators(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ delete: true }),
      })

      expect(typeDefs).toMatch(`DeleteBook`)
    })

    it("should NOT generate the list endpoint when mutators(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ delete: false }),
      })

      expect(typeDefs).not.toMatch(`DeleteBook`)
    })

    it("should NOT generate the list endpoint when mutators(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model()
          .fields({ title: Rel.string() })
          .mutators({ delete: false }),
      })

      expect(typeDefs).not.toMatch(`DeleteBook`)
    })
  })

  describe("runtime", () => {
    const query = server({
      Book: Rel.model().fields({ title: Rel.string() }).mutators(),
    })
    const { cypher } = query

    beforeEach(async (done) => {
      await cypher.exec(
        `CREATE (b:Book { id: "1", title: "The Great Gatsby" })`
      )
      await cypher.exec(`CREATE (b:Movie { id: "2", title: "The Matrix" })`)
      done()
    })

    it("should find the Book", async (done) => {
      const { data } = await query(`
      mutation {
        book: DeleteBook(id: "1") {
          title
        }
      }
    `)

      expect(data?.book.title).toEqual("The Great Gatsby")
      const books = await cypher.exec(`MATCH (b:Book) RETURN b`)
      expect(books).toEqual([])

      done()
    })

    it("should error when no input is specified", async (done) => {
      const { data, errors } = await query(`
      mutation {
        book: DeleteBook {
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
