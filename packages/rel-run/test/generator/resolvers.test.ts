import { string } from "@reldb/meta"
import { ENDPOINTS } from "@reldb/types"
import { generateResolvers } from "../../src/generator/resolvers"

describe("#generateResolvers", () => {
  describe("types", () => {
    it("should create the resolver for the type", () => {
      const resolvers = generateResolvers({
        outputs: {
          Book: {
            name: {
              returns: string(),
            },
            customProp: {
              returns: string(),
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
            returns: string(),
            resolver: () => "HI",
          },
        },
      })

      expect(resolvers.Query.TestQuery).toBeDefined()
      expect(resolvers.Query.TestQuery()).toBe("HI")
    })
  })
})
