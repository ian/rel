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
    it("should generate the list endpoint when mutators(true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { mutators: true }),
      })

      expect(typeDefs).toMatch(`DeleteBook(id: UUID!): Book`)
    })

    it("should generate the list endpoint when mutators(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { mutators: { update: true } }
        ),
      })

      expect(typeDefs).toMatch(`DeleteBook(id: UUID!): Book`)
    })

    it("should NOT generate the list endpoint when mutators(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model(
          { title: Rel.string() },
          { mutators: { update: false } }
        ),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
    })

    it("should NOT generate the list endpoint when mutators(false) is specified", () => {
      const { typeDefs } = server({
        Book: Rel.model({ title: Rel.string() }, { mutators: false }),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
    })
  })

  describe("runtime", () => {
    const query = server({
      Book: Rel.model({ title: Rel.string() }, { mutators: true }),
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
        book: UpdateBook(id: "1", input: { title: "The Great Gatsby Second Edition" }) {
          title
        }
      }
    `)

      expect(data?.book.title).toEqual("The Great Gatsby Second Edition")

      done()
    })

    it("should error when no input is specified", async (done) => {
      const { data, errors } = await query(`
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
