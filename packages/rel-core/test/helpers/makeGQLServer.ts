import { graphql, ExecutionResult } from "graphql"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { generate, RuntimeOpts } from "../../src/runtime"

export default function makeServer(config: RuntimeOpts) {
  const { typeDefs, resolvers, directiveResolvers } = generate(config)
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers,
  })

  return async (query, variables?): Promise<ExecutionResult> => {
    const context = {}

    const gql = await graphql(schema, query, {}, context, variables).catch(
      (err) => {
        console.log("CAUGHT", err)
      }
    )

    if (gql["errors"]) {
      console.log("ERRORS", JSON.stringify(gql["errors"], null, 2))
    }

    return gql || {}
  }
}
