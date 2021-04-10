import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer({ log: false }).schema(schema).runtime()
  }

  describe("typeDef", () => {
    it("should generate the list endpoint when endpoints(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }),
      })

      expect(typeDefs).toMatch(`input _BookWhere {
  id: UUID
  createdAt: DateTime
  updatedAt: DateTime
  title: String
}`)
      expect(typeDefs).toMatch(`FindBook(where: _BookWhere!): Book`)
    })

    it("should generate the list endpoint when endpoints(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: { find: true } }),
      })

      expect(typeDefs).toMatch(`input _BookWhere {
  id: UUID
  createdAt: DateTime
  updatedAt: DateTime
  title: String
}`)
      expect(typeDefs).toMatch(`FindBook(where: _BookWhere!): Book`)
    })

    it("should NOT generate the list endpoint when endpoints(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { find: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`FindBook`)
    })

    it("should NOT generate the list endpoint when endpoints(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { find: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`FindBook`)
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
        query {
          book: FindBook(where: { id: "1" }) {
            title
          }
        }
      `)

      expect(data?.book.title).toEqual("The Great Gatsby")
      done()
    })

    it("should not find books by unknown id", async (done) => {
      const { data } = await graphql(`
        query {
          book: FindBook(where: { id: "FAKE" }) {
            title
          }
        }
      `)

      expect(data?.book).toBe(null)
      done()
    })

    it("should find by title", async (done) => {
      const { data, errors } = await graphql(`
        query {
          book: FindBook(where: { title: "The Great Gatsby" }) {
            title
          }
        }
      `)

      expect(data?.book.title).toEqual("The Great Gatsby")
      done()
    })
  })
})
