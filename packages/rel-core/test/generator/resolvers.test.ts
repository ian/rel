import { string } from "../../src/fields"
import { ENDPOINTS } from "../../src/types"
import { generateResolvers } from "../../src/generator/resolvers"

describe("#generateResolvers", () => {
  describe("types", () => {
    it("should create the resolver for the type", () => {
      const resolvers = generateResolvers({
        types: {
          Book: {
            name: {
              typeDef: {
                returns: string(),
              },
            },
            customProp: {
              typeDef: {
                returns: string(),
              },
              resolver: () => "CUSTOM PROP",
            },
          },
        },
      })

      expect(resolvers.Book).toBeDefined()
      expect(resolvers.Book.customProp).toBeDefined()
      expect(resolvers.Book.customProp()).toBe("CUSTOM PROP")
    })
  })

  describe("endpoints", () => {
    it("should create the resolver for the endpoint", () => {
      const resolvers = generateResolvers({
        endpoints: {
          TestQuery: {
            target: ENDPOINTS.ACCESSOR,
            typeDef: {
              returns: string(),
            },
            resolver: () => "HI",
          },
        },
      })

      expect(resolvers.Query.TestQuery).toBeDefined()
      expect(resolvers.Query.TestQuery()).toBe("HI")
    })
  })
})
