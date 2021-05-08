import Rel from "../../src"
import { Fields, testServer } from "../../src"

const server = (schema) => {
  return testServer({ log: false }).schema(schema).runtime()
}

const adminGuard = Rel.guard("admin").handler(() => {
  throw new Error("GUARDED")
})

class MyField extends Fields.Field {
  constructor() {
    super("String")
  }
}

describe("guard", () => {
  it("should set the guard", async () => {
    const { typeDefs, graphql } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField().guard(adminGuard),
        },
        { id: false, timestamps: false }
      ).endpoints(true)
    )

    expect(typeDefs).toMatch(`type Book {
  field: String
}`)

    const { data, errors } = await graphql(`
      mutation {
        book: CreateBook(input: { field: "VALUE" }) {
          field
        }
      }
    `)

    // expect(errors).not.toBeDefined()
    // expect(data.book).toEqual({ field: null })
  })
})
