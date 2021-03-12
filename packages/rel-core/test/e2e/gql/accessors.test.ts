import { string } from "../../../src/fields"
import makeServer from "../../helpers/makeGQLServer"
import * as Cypher from "../../../src/cypher"
import moment from "moment"

describe("Query", () => {
  beforeEach(async () => {
    await Cypher.cypher(`MATCH (n) DETACH DELETE n;`)
  })

  const server = makeServer({
    schema: {
      Book: {
        fields: {
          title: string(),
        },
        accessors: {
          find: true,
          list: true,
        },
        mutators: {
          create: true,
          update: true,
          delete: true,
        },
      },
    },
  })

  describe("find", () => {
    it("should find books", async () => {
      const book = await Cypher.cypherCreate("Book", {
        title: "Farenheit 451",
      })

      const res = await server(
        `
      query TestFind($id: UUID) {
        book: FindBook(id: $id) {
          id
          title
        }
      }
    `,
        {
          id: book.id,
        }
      )

      const { data } = res
      expect(data.book).toEqual({ id: book.id, title: "Farenheit 451" })
    })
  })

  describe("list", () => {
    beforeEach(async () => {
      await Cypher.cypherCreate(
        "Book",
        {
          id: 1,
          title: "The Great Gatsby",
          createdAt: moment().subtract(1, "day"),
        },
        { id: false, timestamps: false }
      )

      await Cypher.cypherCreate(
        "Book",
        {
          id: 2,
          title: "Farenheit 451",
          createdAt: moment().subtract(1, "hour"),
        },
        { id: false, timestamps: false }
      )
    })

    it("should list books", async () => {
      const res = await server(
        `
      query TestList {
        book: ListBooks {
          title
        }
      }
    `
      )

      const { data } = res
      expect(data.book).toEqual([
        { title: "The Great Gatsby" },
        { title: "Farenheit 451" },
      ])
    })

    it("should allow for ordering", async () => {
      const res = await server(
        `
      query TestList {
        book: ListBooks(order: "title ASC") {
          title
        }
      }
    `
      )

      const { data } = res
      expect(data.book).toEqual([
        { title: "Farenheit 451" },
        { title: "The Great Gatsby" },
      ])
    })

    it("should allow for limiting", async () => {
      const res = await server(
        `
      query TestList {
        book: ListBooks(limit: 1) {
          title
        }
      }
    `
      )

      const { data } = res
      expect(data.book).toEqual([{ title: "The Great Gatsby" }])
    })
  })
})
