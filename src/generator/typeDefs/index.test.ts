import { id, string } from "../../fields"
import { generateTypeDefs } from "."

const subject = (opts) => {
  return generateTypeDefs(opts)
}

describe("Query", () => {
  it("should generate a type Query", () => {
    expect(
      subject({
        Query: {
          TestQuery: {
            params: {
              id: id(),
            },
            returns: string(),
          },
        },
      })
    ).toEqual(`type Query {
  TestQuery(id: UUID): String
}`)
  })
})

describe("Mutation", () => {
  it("should generate a type Mutation", () => {
    expect(
      subject({
        Mutation: {
          TestMutation: {
            params: {
              id: id(),
            },
            returns: string(),
          },
        },
      })
    ).toEqual(`type Mutation {
  TestMutation(id: UUID): String
}`)
  })
})

describe("types", () => {
  it("should generate a type", () => {
    expect(
      subject({
        Book: {
          name: {
            returns: string(),
          },
        },
      })
    ).toEqual(`type Book {
  name: String
}`)
  })

  it("should generate a type with a required field", () => {
    expect(
      subject({
        Book: {
          name: {
            returns: string().required(),
          },
        },
      })
    ).toEqual(`type Book {
  name: String!
}`)
  })
})
