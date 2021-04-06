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
    it("should generate the list endpoint when accessors(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { accessors: true }),
      })

      expect(typeDefs).toMatch(
        `ListBooks(limit: Int, order: String, skip: Int): [Book]!`
      )
    })

    it("should generate the list endpoint when accessors(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { accessors: { list: true } }),
      })

      expect(typeDefs).toMatch(
        `ListBooks(limit: Int, order: String, skip: Int): [Book]!`
      )
    })

    it("should NOT generate the list endpoint when accessors(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { accessors: { list: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
    })

    it("should NOT generate the list endpoint when accessors(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { accessors: { list: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
    })
  })

  describe("runtime", () => {
    const query = server({
      Book: Rel.model({ title: Rel.string() }, { accessors: true }),
    })
    const { cypher } = query

    beforeEach(async (done) => {
      await cypher.exec(
        `CREATE (b:Book { id: "1", title: "The Great Gatsby" })`
      )
      await cypher.exec(`CREATE (b:Movie { id: "2", title: "The Matrix" })`)
      done()
    })

    it("should list the Books", async (done) => {
      const { data } = await query(`
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
