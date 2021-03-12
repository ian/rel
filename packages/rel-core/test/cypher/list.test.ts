import { cypher, cypherList } from "../../src/cypher"

describe("#cypherList", () => {
  beforeEach(async () => {
    await cypher(`MATCH (n) DETACH DELETE n;`)
  })

  describe("basic listing", () => {
    it("should list records", async () => {
      expect(await cypherList("Book")).toEqual([])

      await cypher(`
      CREATE (gatsby:Book { title: "The Great Gatsby" })
      CREATE (f451:Book { title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      expect(await cypherList("Book")).toEqual([
        { __typename: "Book", title: "The Great Gatsby" },
        { __typename: "Book", title: "Farenheit 451" },
      ])
    })
  })

  describe("order", () => {
    it("should list records in order", async () => {
      await cypher(`
      CREATE (gatsby:Book { title: "The Great Gatsby" })
      CREATE (f451:Book { title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      // unordered
      expect(await cypherList("Book")).toEqual([
        { __typename: "Book", title: "The Great Gatsby" },
        { __typename: "Book", title: "Farenheit 451" },
      ])

      // ordered
      expect(await cypherList("Book", { order: "title ASC" })).toEqual([
        { __typename: "Book", title: "Farenheit 451" },
        { __typename: "Book", title: "The Great Gatsby" },
      ])
    })
  })
})
