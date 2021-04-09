import Rel, { testServer } from "../../src"

describe("#model", () => {
  const server = (schema) => {
    return testServer({ log: false }).schema(schema).runtime()
  }

  describe("typeDef", () => {
    it("should generate the list endpoint when endpoints(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: true }),
      })

      expect(typeDefs).toMatch(
        `ListBooks(limit: Int, order: String, skip: Int): [Book]!`
      )
    })

    it("should generate the list endpoint when endpoints(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: { list: true } }),
      })

      expect(typeDefs).toMatch(
        `ListBooks(limit: Int, order: String, skip: Int): [Book]!`
      )
    })

    it("should NOT generate the list endpoint when endpoints(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { list: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
    })

    it("should NOT generate the list endpoint when endpoints(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { list: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
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

    it("should list the Books", async (done) => {
      const { data } = await graphql(`
        query {
          books: ListBooks {
            title
          }
        }
      `)

      expect(data?.books).toEqual([{ title: "The Great Gatsby" }])
      done()
    })
  })
})
