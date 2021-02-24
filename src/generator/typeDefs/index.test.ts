import { uuid, string } from "../../fields"
import { generateTypeDefs } from "."

const subject = (opts) => {
  return generateTypeDefs(opts)
}

describe("Query", () => {
  it("should generate a type Query", () => {
    expect(
      subject({
        types: {
          Query: {
            TestQuery: {
              params: {
                id: uuid(),
              },
              returns: string(),
            },
          },
        },
      })
    ).toMatch(`type Query {
  TestQuery(id: UUID): String
}`)
  })
})

describe("Mutation", () => {
  it("should generate a type Mutation", () => {
    expect(
      subject({
        types: {
          Mutation: {
            TestMutation: {
              params: {
                id: uuid(),
              },
              returns: string(),
            },
          },
        },
      })
    ).toMatch(`type Mutation {
  TestMutation(id: UUID): String
}`)
  })
})

describe("types", () => {
  it("should generate a type", () => {
    expect(
      subject({
        types: {
          Book: {
            name: {
              returns: string(),
            },
          },
        },
      })
    ).toMatch(`type Book {
  name: String
}`)
  })

  it("should generate a type with a required field", () => {
    expect(
      subject({
        types: {
          Book: {
            name: {
              returns: string().required(),
            },
          },
        },
      })
    ).toMatch(`type Book {
  name: String!
}`)
  })
})
