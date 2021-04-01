import { model, string } from "../../src"
import { makeServer } from "@reldb/testing"
import { cypher } from "../../../rel-cypher/dist"

describe("#model", () => {
  const server = (schema) => {
    return makeServer(
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
        Book: model().fields({ title: string() }).mutators(),
      })
      expect(typeDefs).toMatch(`UpdateBook(id: UUID!, input: BookInput!): Book`)
    })
  })

  describe("#mutators()", () => {
    it("should generate the list endpoint when mutators() is called with no params", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).mutators(),
      })

      expect(typeDefs).toMatch(`UpdateBook`)
    })

    it("should generate the list endpoint when mutators(true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).mutators(true),
      })

      expect(typeDefs).toMatch(`UpdateBook`)
    })

    it("should generate the list endpoint when mutators(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).mutators({ update: true }),
      })

      expect(typeDefs).toMatch(`UpdateBook`)
    })

    it("should NOT generate the list endpoint when mutators(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).mutators({ update: false }),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
    })

    it("should NOT generate the list endpoint when mutators(false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).mutators({ update: false }),
      })

      expect(typeDefs).not.toMatch(`UpdateBook`)
    })
  })

  describe("runtime", () => {
    beforeEach(async (done) => {
      await cypher(`CREATE (b:Book { id: "1", title: "The Great Gatsby" })`)
      await cypher(`CREATE (b:Movie { id: "2", title: "The Matrix" })`)
      done()
    })

    const query = server({
      Book: model().fields({ title: string() }).mutators(),
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
