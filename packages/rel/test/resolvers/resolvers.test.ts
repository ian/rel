import Rel, { Connection } from "../../src"
import { GraphQLOperation } from "../../src/types"
import { generateResolvers } from "../../src/server/resolvers"

const cypher = Connection.init({
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
              properties: {
                name: {
                  returns: "String",
                },
                customProp: {
                  returns: "String",
                  handler: () => "CUSTOM PROP",
                },
              },
              returns: "Book",
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
          graphqlEndpoints: [
            {
              name: "TestQuery",
              operation: GraphQLOperation.QUERY,
              returns: "String",
              handler: () => "HI",
            },
          ],
        },
        { cypher }
      )

      expect(resolvers.Query.TestQuery).toBeDefined()
      expect(await resolvers.Query.TestQuery()).toBe("HI")
    })
  })
})