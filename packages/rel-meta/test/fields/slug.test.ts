import { makeServer } from "@reldb/testing"
import { slug, string } from "../../src"

describe("default properties", () => {
  const server = makeServer(
    {
      schema: {
        Book: {
          fields: {
            title: string().required(),
            slug: slug({ from: "title" }),
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
    },
    {
      // log: true,
    }
  )

  it("should error when not given a from", () => {
    expect(() => slug(null)).toThrowError(
      'slug() requires { from: "..." } param'
    )
  })

  it("should output the GQL type String", () => {
    expect(slug({ from: "fake" }).toGQL()).toBe("String")
  })

  it("should set the slug using from param", async () => {
    const res = await server(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)
    const { book } = res.data
    expect(book.title).toBe("The Great Gatsby")
    expect(book.slug).toBe("the-great-gatsby")
  })

  it("handle collisions", async () => {
    const firstBook = await server(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)
    expect(firstBook.data.book.title).toBe("The Great Gatsby")
    expect(firstBook.data.book.slug).toBe("the-great-gatsby")

    const secondBook = await server(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)
    expect(secondBook.data.book.title).toBe("The Great Gatsby")
    expect(secondBook.data.book.slug).toBe("the-great-gatsby-1")
  })
})
