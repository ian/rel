import { slug, string } from "@reldb/meta"
import { makeServer } from "@reldb/jest"
import * as Cypher from "../../../src/cypher"

describe("slugs", () => {
  const server = makeServer({
    schema: {
      Book: {
        fields: {
          title: string(),
          slug: slug({ from: "title" }),
        },
        accessors: {
          find: true,
        },
        mutators: {
          create: true,
          update: true,
          delete: true,
        },
      },
    },
  })

  describe("creating", () => {
    it("should create a model and autogenerate the slug", async () => {
      const res = await server(
        `
      mutation TestCreate($book: BookInput!) {
        book: CreateBook(input: $book) {
          title
          slug
        }
      }
    `,
        {
          book: {
            title: "The Great Gatsby",
          },
        }
      )

      const { data } = res
      expect(data.book).toEqual({
        title: "The Great Gatsby",
        slug: "the-great-gatsby",
      })
    })

    it("should create a second model and autogenerate an incremented slug", async () => {
      await Cypher.cypherCreate("Book", {
        title: "The Great Gatsby",
        slug: "the-great-gatsby",
      })

      const res = await server(
        `
      mutation TestCreate($book: BookInput!) {
        book: CreateBook(input: $book) {
          title
          slug
        }
      }
    `,
        {
          book: {
            title: "The Great Gatsby",
          },
        }
      )

      const { data } = res
      expect(data.book).toEqual({
        title: "The Great Gatsby",
        slug: "the-great-gatsby-1",
      })
    })
  })

  describe("updating", () => {
    it("should update a model", async () => {
      const book = await Cypher.cypherCreate("Book", {
        title: "",
        slug: "the-great-gatsby",
      })

      const res = await server(
        `
      mutation TestUpdate($id: UUID, $input: BookInput!) {
        book: UpdateBook(id: $id, input: $input) {
          title
          slug
        }
      }
    `,
        {
          id: book.id,
          input: {
            title: "The High-Bouncing Lover",
          },
        }
      )

      if (res.errors) console.log({ res })

      const { data } = res
      expect(data.book).toEqual({
        title: "The High-Bouncing Lover",
        slug: "the-great-gatsby",
      })

      // let's make sure it's not creating anything new
      const list = await Cypher.cypherList("Book")
      expect(list.length).toBe(1)
    })
  })
})
