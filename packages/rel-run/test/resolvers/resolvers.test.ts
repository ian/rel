import Rel, { Connection } from "../../src"
import { ENDPOINTS } from "../../src/types"
import { generateResolvers } from "../../src/runtime/resolvers"

const cypher = Connection.init({
  type: Connection.NEO4J,
  url: process.env.NEO4J_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD,
})

describe("#generateResolvers", () => {
  describe("types", () => {
    it("should create the resolver for the type", async () => {
      const resolvers = generateResolvers(
        {
          outputs: {
            Book: {
              name: Rel.string(),
              customProp: Rel.string().resolver(() => "CUSTOM PROP"),
            },
          },
        },
        { cypher }
      )

      expect(resolvers.Book).toBeDefined()
      expect(resolvers.Book.customProp).toBeDefined()
      expect(await resolvers.Book.customProp()).toBe("CUSTOM PROP")
    })
  })

  describe("endpoints", () => {
    it("should create the resolver for the endpoint", async () => {
      const resolvers = generateResolvers(
        {
          endpoints: {
            TestQuery: {
              target: ENDPOINTS.ACCESSOR,
              returns: Rel.string(),
              resolver: () => "HI",
            },
          },
        },
        { cypher }
      )

      expect(resolvers.Query.TestQuery).toBeDefined()
      expect(await resolvers.Query.TestQuery()).toBe("HI")
    })
  })
})
