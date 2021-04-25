import Rel, { testServer } from "../../src"

describe("#model create", () => {
  const server = (schema) => {
    return testServer({ log: false }).models(schema).runtime()
  }

  describe("typeDef", () => {
    it("should generate the list endpoint when endpoints(true) is specified", () => {
      const { typeDefs } = server(
        Rel.model("Book", { title: Rel.string() }).endpoints(true)
      )

      expect(typeDefs).toMatch(`CreateBook(input: BookInput!): Book`)
    })

    it("should generate the list endpoint when endpoints(list: true) is specified", () => {
      const { typeDefs } = server(
        Rel.model("Book", { title: Rel.string() }).endpoints({ create: true })
      )

      expect(typeDefs).toMatch(`CreateBook(input: BookInput!): Book`)
    })

    it("should NOT generate the list endpoint when endpoints(list:false) is specified", () => {
      const { typeDefs } = server(
        Rel.model("Book", { title: Rel.string() }).endpoints({ create: false })
      )

      expect(typeDefs).not.toMatch(`CreateBook`)
    })

    it("should NOT generate the list endpoint when endpoints(false) is specified", () => {
      const { typeDefs } = server(
        Rel.model("Book", { title: Rel.string() }).endpoints(false)
      )

      expect(typeDefs).not.toMatch(`CreateBook`)
    })
  })

  describe("runtime", () => {
    const { graphql } = server(
      Rel.model("Book", { title: Rel.string() }).endpoints(true)
    )

    it("should find the Book", async (done) => {
      const { data } = await graphql(`
        mutation {
          book: CreateBook(input: { title: "The Great Gatsby" }) {
            title
          }
        }
      `)

      expect(data?.book.title).toEqual("The Great Gatsby")
      done()
    })

    it("should error when no input is specified", async (done) => {
      const { data, errors } = await graphql(`
        mutation {
          book: CreateBook {
            title
          }
        }
      `)

      expect(data?.book).not.toBeDefined()
      expect(errors.length).toBeGreaterThanOrEqual(1)

      done()
    })

    it.todo("should respect defaults")
  })
})
