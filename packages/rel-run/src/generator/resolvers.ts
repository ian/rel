import { ENDPOINTS, Reducible, Resolver } from "@reldb/types"
import { cypher, cypher1 } from "../cypher"
import _ from "lodash"

function augmentResolver(resolver) {
  return (obj, params, context) => {
    const runtime = { obj, params, context }

    return resolver({
      ...runtime,
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

type GQLArgs = [
  obj: ResolverObject,
  params: ResolverParams,
  context: RuntimeContext
]

// type RuntimeArgs = {
//   obj: ResolverObject
//   params: ResolverParams
//   context: RuntimeContext
// }

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

export function generateResolvers(reduced: Reducible): Resolvers {
  const { outputs, endpoints } = reduced
  let resolvers = {}

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [typeName, type] = entry
      let typeResolver = {}
      Object.entries(type).forEach((propEntry) => {
        const [fieldName, property] = propEntry

        if (property.resolver) {
          typeResolver[fieldName] = augmentResolver(property.resolver)
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
          queries[name] = augmentResolver(endpoint.resolver)
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = augmentResolver(endpoint.resolver)
          break
        default:
          throw new Error(`Unknown endpoint type ${target} for ${name}`)
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
