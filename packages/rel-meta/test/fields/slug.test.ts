import { model, slug, string } from "../../src"
import { makeServer } from "@reldb/testing"

describe("error handling", () => {
  it("should error when not given a from", () => {
    expect(() => slug(null)).toThrowError(
      'slug() requires { from: "..." } param'
    )
  })
})

describe("runtime", () => {
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

  it("should output the right GQL type", () => {
    const { typeDefs } = server({
      Book: model({ id: false, timestamps: false }).fields({
        title: string().required(),
        slug: slug({ from: "title" }),
      }),
    })

    expect(typeDefs).toMatch(`type Book {
  title: String!
  slug: String
}
`)
  })
})

describe("default properties", () => {
  const server = makeServer(
    {
      schema: {
        Book: model()
          .fields({
            title: string().required(),
            slug: slug({ from: "title" }),
          })
          .mutators(),
      },
    },
    {
      // log: true,
    }
  )

  it("should set the slug using from param", async () => {
    const res = await server(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)

    expect(res.data?.book.title).toBe("The Great Gatsby")
    expect(res.data?.book.slug).toBe("the-great-gatsby")
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
    expect(firstBook?.data.book.title).toBe("The Great Gatsby")
    expect(firstBook?.data.book.slug).toBe("the-great-gatsby")

    const secondBook = await server(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)
    expect(secondBook?.data.book.title).toBe("The Great Gatsby")
    expect(secondBook?.data.book.slug).toBe("the-great-gatsby-1")
  })
})
