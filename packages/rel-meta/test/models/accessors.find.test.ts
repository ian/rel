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
        Book: model().fields({ title: string() }).accessors(),
      })
      expect(typeDefs).toMatch(`FindBook(id: UUID!): Book`)
    })
  })

  describe("#accessors()", () => {
    it("should generate the list endpoint when accessors() is called with no params", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors(),
      })

      expect(typeDefs).toMatch(`FindBook`)
    })

    it("should generate the list endpoint when accessors(true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors(true),
      })

      expect(typeDefs).toMatch(`FindBook`)
    })

    it("should generate the list endpoint when accessors(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ find: true }),
      })

      expect(typeDefs).toMatch(`FindBook`)
    })

    it("should NOT generate the list endpoint when accessors(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ find: false }),
      })

      expect(typeDefs).not.toMatch(`FindBook`)
    })

    it("should NOT generate the list endpoint when accessors(false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ find: false }),
      })

      expect(typeDefs).not.toMatch(`FindBook`)
    })
  })

  describe("runtime", () => {
    beforeEach(async (done) => {
      await cypher(`CREATE (b:Book { id: "1", title: "The Great Gatsby" })`)
      await cypher(`CREATE (b:Movie { id: "2", title: "The Matrix" })`)
      done()
    })

    const query = server({
      Book: model().fields({ title: string() }).accessors(),
    })

    it("should find the Book", async (done) => {
      const { data } = await query(`
      query {
        book: FindBook(id: "1") {
          title
        }
      }
    `)

      expect(data?.book.title).toEqual("The Great Gatsby")
      done()
    })

    it("should not find books by unknown id", async (done) => {
      const { data } = await query(`
      query {
        book: FindBook(id: "FAKE") {
          title
        }
      }
    `)

      expect(data?.book).toBe(null)
      done()
    })
  })
})
