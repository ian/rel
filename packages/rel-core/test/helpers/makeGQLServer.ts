import { makeExecutableSchema } from "@graphql-tools/schema"
import { ApolloServer } from "apollo-server"
import { generate, RuntimeOpts } from "../../src/runtime"

export default function makeServer(config: RuntimeOpts) {
  const { typeDefs, resolvers, directives } = generate(config)
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers: directives,
  })

  const server = new ApolloServer({
    schema,
    resolvers,
  })

  return async (query, variables?) => {
    const context = {}
    return server.executeOperation({ query, variables })
  }
}
