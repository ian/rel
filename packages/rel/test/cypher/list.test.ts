import { Connection } from "../../src"

const Cypher = Connection.init({
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
})

describe("#cypherList", () => {
  describe("basic listing", () => {
    it("should list records", async (done) => {
      expect(await Cypher.list("Book")).toEqual([])

      await Cypher.exec(`
      CREATE (gatsby:Book { id: 1, title: "The Great Gatsby" })
      CREATE (f451:Book { id: 2, title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      expect(await Cypher.list("Book")).toEqual([
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
        { __typename: "Book", id: 2, title: "Farenheit 451" },
      ])

      done()
    })
  })

  describe("order", () => {
    it("should list records in order", async (done) => {
      await Cypher.exec(`
      CREATE (gatsby:Book { id: 1, title: "The Great Gatsby" })
      CREATE (f451:Book { id: 2, title: "Farenheit 451" })
      RETURN f451, gatsby;
      `)

      // unordered
      expect(await Cypher.list("Book")).toEqual([
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
        { __typename: "Book", id: 2, title: "Farenheit 451" },
      ])

      // ordered
      expect(await Cypher.list("Book", { order: "title ASC" })).toEqual([
        { __typename: "Book", id: 2, title: "Farenheit 451" },
        { __typename: "Book", id: 1, title: "The Great Gatsby" },
      ])

      done()
    })
  })
})
