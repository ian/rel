import Rel from "../../src"
import { Fields, testServer } from "../../src"

class MyField extends Fields.Field {
  constructor() {
    super("String")
  }
}

const server = (schema) => {
  return testServer({ log: false })
    .schema(schema)
    .guards(
      Rel.guard("admin").handler(() => {
        throw new Error("GUARDED")
      })
    )
    .runtime()
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
  it("should have default values", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField(),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: String
}`)
  })
})

describe("required", () => {
  it("should set required", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField().required(),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: String!
}`)
  })

  it("should allow it to be specified false", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField().required(false),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: String
}`)
  })

  it("should allow it to be specified true", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField().required(true),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: String!
}`)
  })
})

describe("guard", () => {
  it("should set the guard", async () => {
    const { typeDefs } = await server(
      Rel.model(
        "Book",
        {
          field: new MyField().guard(Rel.guard("admin")),
        },
        { id: false, timestamps: false }
      )
    )

    expect(typeDefs).toMatch(`type Book {
  field: String @admin
}`)
  })
})

describe("default", () => {
  it("should set the default when const", async (done) => {
    const { graphql } = server(
      Rel.model(
        "Book",
        {
          field: new MyField().default("const"),
        },
        { id: false, timestamps: false }
      ).endpoints(true)
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
      Rel.model(
        "Book",
        {
          field: new MyField().default(() => "function"),
        },
        { id: false, timestamps: false }
      ).endpoints(true)
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
      Rel.model(
        "Book",
        {
          field: new MyField().handler(() => "resolved"),
        },
        { id: false, timestamps: false }
      ).endpoints(true)
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
