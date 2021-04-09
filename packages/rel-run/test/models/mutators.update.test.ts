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

      expect(typeDefs).toMatch(`UpdateBook(id: UUID!, input: BookInput!): Book`)
    })

    it("should generate the list endpoint when endpoints(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { update: true } }
        ),
      })

      expect(typeDefs).toMatch(`UpdateBook(id: UUID!, input: BookInput!): Book`)
    })

    it("should NOT generate the list endpoint when endpoints(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { endpoints: { update: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
    })

    it("should NOT generate the list endpoint when endpoints(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { endpoints: false }),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
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
          book: UpdateBook(
            id: "1"
            input: { title: "The Great Gatsby Second Edition" }
          ) {
            title
          }
        }
      `)

      expect(data?.book.title).toEqual("The Great Gatsby Second Edition")

      done()
    })

    it("should error when no input is specified", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          book: UpdateBook {
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
