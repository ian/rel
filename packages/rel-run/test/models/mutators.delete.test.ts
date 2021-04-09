import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer({ log: false }).schema(schema).runtime()
  }

  describe("typeDef", () => {
    it("should generate the delete endpoint when endpoints(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: true }),
      })

      expect(typeDefs).toMatch(`DeleteBook(id: UUID!): Book`)
    })

    it("should generate the list endpoint when endpoints(delete: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { delete: true } }
        ),
      })

      expect(typeDefs).toMatch(`DeleteBook(id: UUID!): Book`)
    })

    it("should NOT generate the list endpoint when endpoints(delete:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { delete: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`DeleteBook`)
    })

    it("should NOT generate the list endpoint when endpoints(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: false }),
      })

      expect(typeDefs).not.toMatch(`DeleteBook`)
    })
  })

  describe("runtime", () => {
    const { cypher, graphql } = server({
      Book: Rel.model({ title: Rel.string() }, { endpoints: true }),
    })

    beforeEach(async (done) => {
      await cypher.exec(
        `CREATE (b:Book { id: "1", title: "The Great Gatsby" })`
      )
      await cypher.exec(`CREATE (b:Movie { id: "2", title: "The Matrix" })`)
      done()
    })

    it("should find the Book", async (done) => {
      const { data } = await graphql(`
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
      const { data, errors } = await graphql(`
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
