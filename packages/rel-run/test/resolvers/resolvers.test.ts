import { string } from "@reldb/meta"
import { ENDPOINTS } from "@reldb/types"
import { generateResolvers } from "../../src/runtime/resolvers"

describe("#generateResolvers", () => {
  describe("types", () => {
    it("should create the resolver for the type", async () => {
      const resolvers = generateResolvers({
        outputs: {
          Book: {
            name: string(),
            customProp: string().resolver(() => "CUSTOM PROP"),
          },
        },
      })

      expect(resolvers.Book).toBeDefined()
      expect(resolvers.Book.customProp).toBeDefined()
      expect(await resolvers.Book.customProp()).toBe("CUSTOM PROP")
    })
  })

  describe("endpoints", () => {
    it("should create the resolver for the endpoint", async () => {
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
      expect(await resolvers.Query.TestQuery()).toBe("HI")
    })
  })
})
