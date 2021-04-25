import { Reduced } from "../types"
import _ from "lodash"
import { CypherInstance } from "../cypher/connection"
import { splitGraphQLEndpoints } from "../util/endpoints"

const DEFAULT_RUNTIME = {
  // Cypher,
}

export type ResolverOpts = {
  cypher: CypherInstance
}

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
            const runtime = { obj, params, context }
            return field.handler(
              {
                ...DEFAULT_RUNTIME,
                ...runtime,
                cypher,
              },
              {
                modelName: typeName,
                fieldName,
              }
            )
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
          acc[endpoint.name] = async (obj, params, context) => {
            const runtime = { obj, params, context }
            return endpoint.handler({ ...DEFAULT_RUNTIME, ...runtime, cypher })
          }
          return acc
        }, {}),
      })
    }

    if (!_.isEmpty(mutations)) {
      Object.assign(resolvers, {
        Mutation: mutations.reduce((acc, endpoint) => {
          acc[endpoint.name] = async (obj, params, context) => {
            const runtime = { obj, params, context }
            return endpoint.handler({ ...DEFAULT_RUNTIME, ...runtime, cypher })
          }
          return acc
        }, {}),
      })
    }
  }

  return resolvers
}

export function generateDirectiveResolvers(
  reduced: Reduced,
  opts: ResolverOpts
) {
  const { cypher } = opts
  return Object.entries(reduced.directives).reduce((acc, dir) => {
    const [name, { resolver }] = dir
    acc[name] = (runtime) =>
      resolver({ ...DEFAULT_RUNTIME, cypher, ...runtime })
    return acc
  }, {})
}
