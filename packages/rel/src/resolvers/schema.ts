import _ from "lodash"
import { Reduced } from "../types"
import { ResolverOpts } from "./index"
import { splitGraphQLEndpoints } from "../util/endpoints"

type Resolvers = {
  Query?: {
    [name: string]: (...GQLArgs) => any
  }
  Mutation?: {
    [name: string]: (...GQLArgs) => any
  }
  [type: string]: {
    [name: string]: (...GQLArgs) => any
  }
}

export function generateResolvers(
  reduced: Reduced,
  opts: ResolverOpts
): Resolvers {
  const { cypher } = opts
  const { outputs, graphqlEndpoints } = reduced
  let resolvers = {}

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [typeName, output] = entry
      let typeResolver = {}

      Object.entries(output.properties).forEach((propEntry) => {
        const [fieldName, field] = propEntry

        if (field.handler) {
          typeResolver[fieldName] = async (obj, params, context) => {
            const runtime = { obj, params, context, cypher }
            return field.handler(runtime, {
              modelName: typeName,
              fieldName,
            })
          }
        }
      })

      resolvers[typeName] = typeResolver
    })
  }

  if (graphqlEndpoints) {
    const { queries, mutations } = splitGraphQLEndpoints(graphqlEndpoints)

    if (!_.isEmpty(queries)) {
      Object.assign(resolvers, {
        Query: queries.reduce((acc, endpoint) => {
          const { guard } = endpoint
          acc[endpoint.name] = async (obj, params, context) => {
            const runtime = { obj, params, context, cypher }
            if (guard)
              Object.assign(runtime, ...(await guard.resolver(runtime)))
            return endpoint.handler(runtime)
          }
          return acc
        }, {}),
      })
    }

    if (!_.isEmpty(mutations)) {
      Object.assign(resolvers, {
        Mutation: mutations.reduce((acc, endpoint) => {
          const { guard } = endpoint
          acc[endpoint.name] = async (obj, params, context) => {
            const runtime = { obj, params, context, cypher }
            if (guard)
              Object.assign(runtime, ...(await guard.resolver(runtime)))
            return endpoint.handler(runtime)
          }
          return acc
        }, {}),
      })
    }
  }

  return resolvers
}
