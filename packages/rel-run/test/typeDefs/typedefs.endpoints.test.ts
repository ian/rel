import Rel, { GraphQLOperationType } from "../../src"
import { generateTypeDefs } from "../../src/server/typeDefs"

describe("typeDefs", () => {
  describe("Query", () => {
    const subject = () => {
      return generateTypeDefs({
        graphQLEndpoints: [
          {
            label: "TestQuery",
            type: GraphQLOperationType.QUERY,
            params: {
              id: Rel.uuid(),
            },
            returns: Rel.string(),
            resolver: () => {},
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
        graphQLEndpoints: [
          {
            label: "TestMutation",
            type: GraphQLOperationType.MUTATION,
            params: {
              id: Rel.uuid(),
            },
            returns: Rel.string(),
            resolver: () => {},
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
            name: Rel.string(),
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
              name: Rel.string(),
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
              name: Rel.string().required(),
            },
          },
        })
      ).toMatch(`type Book {
  name: String!
}`)
    })
  })
})
