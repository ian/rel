import { ENDPOINTS, Reduced } from "../types"
import _ from "lodash"
import { CypherInstance } from "../cypher/connection"

const DEFAULT_RUNTIME = {
  // Cypher,
}

export type RuntimeContext = {
  [contextParam: string]: any
}

export type ResolverOpts = {
  cypher: CypherInstance
}

export type ResolverObject = any

export type ResolverParams = {
  [key: string]: any
}

type GQLArgs = [
  obj: ResolverObject,
  params: ResolverParams,
  context: RuntimeContext
]

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
  const { outputs, endpoints } = reduced
  let resolvers = {}

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [typeName, type] = entry
      let typeResolver = {}

      Object.entries(type).forEach((propEntry) => {
        const [fieldName, field] = propEntry

        if (field._resolver) {
          typeResolver[fieldName] = async (obj, params, context) => {
            const runtime = { obj, params, context }
            return field._resolver({
              ...DEFAULT_RUNTIME,
              ...runtime,
              cypher,
              fieldName,
            })
          }
        }
      })

      resolvers[typeName] = typeResolver
    })
  }

  if (endpoints) {
    let queries = {},
      mutations = {}

    Object.entries(endpoints).forEach((entry) => {
      const [name, endpoint] = entry
      const { target } = endpoint

      switch (target) {
        case ENDPOINTS.ACCESSOR:
          queries[name] = async (obj, params, context) => {
            const runtime = { obj, params, context }
            return endpoint.resolver({ ...DEFAULT_RUNTIME, ...runtime, cypher })
          }
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = async (obj, params, context) => {
            const runtime = { obj, params, context }
            return endpoint.resolver({ ...DEFAULT_RUNTIME, ...runtime, cypher })
          }
          break
        default:
          throw new Error(`Unknown endpoint type '${target}' for ${name}`)
      }
    })

    if (!_.isEmpty(queries)) {
      Object.assign(resolvers, {
        Query: queries,
      })
    }

    if (!_.isEmpty(mutations)) {
      Object.assign(resolvers, {
        Mutation: mutations,
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
  return Object.entries(reduced.guards).reduce((acc, dir) => {
    const [name, { resolver }] = dir
    acc[name] = (runtime) =>
      resolver({ ...DEFAULT_RUNTIME, cypher, ...runtime })
    return acc
  }, {})
}
