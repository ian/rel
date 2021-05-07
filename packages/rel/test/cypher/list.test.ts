import { testServer } from "../../src"
const { cypher } = testServer({ log: false }).runtime()

describe("#cypherList", () => {
  describe("basic listing", () => {
    it("should list records", async (done) => {
      expect(await cypher.list("Book")).toEqual([])

      await cypher.exec(`
      CREATE (gatsby:Book { id: 1, title: "The Great Gatsby" })
      CREATE (f451:Book { id: 2, title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      expect(await cypher.list("Book")).toEqual([
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
        { __typename: "Book", id: 2, title: "Farenheit 451" },
      ])

      done()
    })
  })

  describe("order", () => {
    it("should list records in order", async (done) => {
      await cypher.exec(`
      CREATE (gatsby:Book { id: 1, title: "The Great Gatsby" })
      CREATE (f451:Book { id: 2, title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      // unordered
      expect(await cypher.list("Book")).toEqual([
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
        { __typename: "Book", id: 2, title: "Farenheit 451" },
      ])

      // ordered
      expect(await cypher.list("Book", { order: "title ASC" })).toEqual([
        { __typename: "Book", id: 2, title: "Farenheit 451" },
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
      ])

      done()
    })
  })
})
