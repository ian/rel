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
      expect(typeDefs).toMatch(
        `ListBooks(limit: Int, order: String, skip: Int): [Book]!`
      )
    })
  })

  describe("#accessors()", () => {
    it("should generate the list endpoint when accessors() is called with no params", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors(),
      })

      expect(typeDefs).toMatch(`ListBooks`)
    })

    it("should generate the list endpoint when accessors(true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors(true),
      })

      expect(typeDefs).toMatch(`ListBooks`)
    })

    it("should generate the list endpoint when accessors(list: true) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ list: true }),
      })

      expect(typeDefs).toMatch(`ListBooks`)
    })

    it("should NOT generate the list endpoint when accessors(list:false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ list: false }),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
    })

    it("should NOT generate the list endpoint when accessors(false) is specified", () => {
      const { typeDefs } = server({
        Book: model().fields({ title: string() }).accessors({ list: false }),
      })

      expect(typeDefs).not.toMatch(`ListBooks`)
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
