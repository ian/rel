import Rel, { testServer } from "../../src"

describe("error handling", () => {
  it("should error when not given a from", () => {
    expect(() => Rel.slug(null)).toThrowError(
      'slug() requires { from: "..." } param'
    )
  })
})

describe("runtime", () => {
  it("should output the right GQL type", async () => {
    const { typeDefs } = await testServer()
      .schema({
        Book: Rel.model(
          {
            title: Rel.string().required(),
            slug: Rel.slug({ from: "title" }),
          },
          { id: false, timestamps: false }
        ),
      })
      .start()

    expect(typeDefs).toMatch(`type Book {
  title: String!
  slug: String
}
`)
  })
})

describe("default properties", () => {
  const { graphql } = testServer({ log: false })
    .schema({
      Book: Rel.model(
        {
          title: Rel.string().required(),
          slug: Rel.slug({ from: "title" }),
        },
        { endpoints: true }
      ),
    })
    .runtime()

  it("should set the slug using from param", async () => {
    const res = await graphql(`
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
    const firstBook = await graphql(`
      mutation {
        book: CreateBook(input: { title: "The Great Gatsby" }) {
          title
          slug
        }
      }
    `)
    expect(firstBook?.data.book.title).toBe("The Great Gatsby")
    expect(firstBook?.data.book.slug).toBe("the-great-gatsby")

    const secondBook = await graphql(`
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
