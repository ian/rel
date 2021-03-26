import { ENDPOINTS } from "@reldb/types"
import { string, uuid } from "@reldb/meta"
import { generateTypeDefs } from "../../src/generator/typeDefs"

describe("typeDefs", () => {
  describe("Query", () => {
    const subject = () => {
      return generateTypeDefs({
        endpoints: {
          TestQuery: {
            target: ENDPOINTS.ACCESSOR,
            params: {
              id: uuid(),
            },
            returns: string(),
            resolver: () => {},
          },
        },
      })
    }

    it("should generate the Query type", () => {
      expect(subject()).toMatch(`type Query {
  TestQuery(id: UUID): String
}`)
    })

    it("should not have a Mutation generated", () => {
      expect(subject()).not.toMatch(`type Mutation`)
    })
  })

  describe("Mutation", () => {
    const subject = () => {
      return generateTypeDefs({
        endpoints: {
          TestMutation: {
            target: ENDPOINTS.MUTATOR,
            params: {
              id: uuid(),
            },
            returns: string(),
            resolver: () => {},
          },
        },
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
            name: {
              returns: string(),
            },
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
        generateTypeDefs({
          outputs: {
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
})
