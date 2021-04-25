import Rel from "../../src"
import { GraphQLOperation } from "../../src/types"
import { generateTypeDefs } from "../../src/server/typeDefs"

describe("typeDefs", () => {
  describe("Query", () => {
    const subject = () => {
      return generateTypeDefs({
        graphqlEndpoints: [
          {
            name: "TestQuery",
            operation: GraphQLOperation.QUERY,
            params: {
              id: {
                returns: "UUID",
              },
            },
            returns: "String",
            handler: () => {},
          },
        ],
      })
    }

    it("should generate the Query type", () => {
      expect(subject()).toMatch(`type Query {
  TestQuery(id: UUID): String
}`)
      expect(subject()).not.toMatch(`type Mutation`)
    })
  })

  describe("Mutation", () => {
    const subject = () => {
      return generateTypeDefs({
        graphqlEndpoints: [
          {
            name: "TestMutation",
            operation: GraphQLOperation.MUTATION,
            params: {
              id: {
                returns: "UUID",
              },
            },
            returns: "String",
            handler: () => {},
          },
        ],
      })
    }

    it("should generate the Mutation type", () => {
      expect(subject()).toMatch(`type Mutation {
  TestMutation(id: UUID): String
}`)
    })

    it("should not have a Query generated", () => {
      expect(subject()).not.toMatch(`type Query`)
    })
  })

  describe("inputs", () => {
    const subject = () => {
      return generateTypeDefs({
        inputs: {
          BookInput: {
            properties: {
              name: {
                returns: "String",
              },
            },
            returns: "BookInput",
          },
        },
      })
    }

    it("should generate an input", () => {
      expect(subject()).toMatch(`input BookInput {
  name: String
}`)
    })
  })

  describe("types", () => {
    it("should generate a type", () => {
      expect(
        generateTypeDefs({
          outputs: {
            Book: {
              properties: {
                name: {
                  returns: "String",
                },
              },
              returns: "Book",
            },
          },
        })
      ).toMatch(`type Book {
  name: String
}`)
    })

    it("should generate a type with a required field", () => {
      expect(
        generateTypeDefs({
          outputs: {
            Book: {
              properties: {
                name: {
                  returns: "String",
                  required: true,
                },
              },
              returns: "Book",
            },
          },
        })
      ).toMatch(`type Book {
  name: String!
}`)
    })
  })
})
