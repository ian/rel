import { ENDPOINTS, Reducible, Resolver } from "~/types"
import { cypher, cypher1 } from "~/cypher"

function augmentResolver(resolver) {
  return (obj, params, context) => {
    return resolver({
      obj,
      params,
      context,
      cypher,
      cypher1,
    })
  }
}

export type RuntimeContext = {
  [contextParam: string]: any
}

export type ResolverObject = any

export type ResolverParams = {
  [key: string]: any
}

type ResolverArgs = [
  obj: ResolverObject,
  params: ResolverParams,
  context: RuntimeContext
]

type Resolvers = {
  Query?: {
    [name: string]: (...ResolverArgs) => any
  }
  Mutation?: {
    [name: string]: (...ResolverArgs) => any
  }
  [type: string]: {
    [name: string]: (...ResolverArgs) => any
  }
}

export function generateResolvers(reduced: Reducible): Resolvers {
  const { types, endpoints } = reduced
  let resolvers = {}

  if (types) {
    Object.entries(types).forEach((entry) => {
      const [name, type] = entry
      let typeResolver = {}
      Object.entries(type).forEach((propEntry) => {
        const [name, property] = propEntry
        if (property.resolver) {
          typeResolver[name] = augmentResolver(property.resolver)
        }
      })
      resolvers[name] = typeResolver
    })
  }

  if (endpoints) {
    let queries = {},
      mutations = {}

    Object.entries(endpoints).forEach((entry) => {
      const [name, endpoint] = entry
      const { type } = endpoint

      switch (type) {
        case ENDPOINTS.ACCESSOR:
          queries[name] = augmentResolver(endpoint.resolver)
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = augmentResolver(endpoint.resolver)
          break
        default:
          throw new Error(`Unknown endpoint type ${type} for ${name}`)
      }
    })

    Object.assign(resolvers, {
      Query: queries,
      Mutation: mutations,
    })
  }

  return resolvers
}
