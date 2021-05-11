import Rel from "../../src"
import { Fields, testServer } from "../../src"

class MyField extends Fields.Field {
  constructor() {
    super("String")
  }
}

const server = (schema) => {
  return testServer({ log: false }).schema(schema).runtime()
}

describe("functions", () => {
  it("should define required", () => {
    expect(new MyField().required).toBeDefined()
  })

  it("should define guard", () => {
    expect(new MyField().guard).toBeDefined()
  })
})

describe("defaults", () => {
  it("should by default be the type", async () => {
    const { typeDefs } = await server(
      Rel.model("Book", {
        field: new MyField(),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  field: String
}`)
  })
})

describe("required", () => {
  it("should set required", async () => {
    const { typeDefs } = await server(
      Rel.model("Book", {
        field: new MyField().required(),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  field: String!
}`)
  })

  it("should allow it to be specified false", async () => {
    const { typeDefs } = await server(
      Rel.model("Book", {
        field: new MyField().required(false),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  field: String
}`)
  })

  it("should allow it to be specified true", async () => {
    const { typeDefs } = await server(
      Rel.model("Book", {
        field: new MyField().required(true),
      })
    )

    expect(typeDefs).toMatch(`type Book {
  id: UUID!
  createdAt: DateTime!
  updatedAt: DateTime!
  field: String!
}`)
  })
})

describe("default", () => {
  it("should set the default when const", async (done) => {
    const { graphql } = server(
      Rel.model("Book", {
        field: new MyField().default("const"),
      }).endpoints(true)
    )

    const { data, errors } = await graphql(`
      mutation {
        book: CreateBook(input: {}) {
          field
        }
      }
    `)

    expect(errors).not.toBeDefined()
    expect(data.book).toEqual({ field: "const" })

    done()
  })

  it("should set the default when function", async (done) => {
    const { graphql } = server(
      Rel.model("Book", {
        field: new MyField().default(() => "function"),
      }).endpoints(true)
    )

    const { data, errors } = await graphql(`
      mutation {
        book: CreateBook(input: {}) {
          field
        }
      }
    `)

    expect(errors).not.toBeDefined()
    expect(data.book).toEqual({ field: "function" })

    done()
  })
})

describe("resolver", () => {
  it("should use the resolver value", async (done) => {
    const { graphql } = await server(
      Rel.model("Book", {
        field: new MyField().resolve(() => "resolved"),
      }).endpoints(true)
    )

    const { data, errors } = await graphql(`
      mutation {
        book: CreateBook(input: {}) {
          field
        }
      }
    `)

    expect(errors).not.toBeDefined()
    expect(data.book).toEqual({ field: "resolved" })

    done()
  })
})
