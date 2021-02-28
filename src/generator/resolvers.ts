import { ENDPOINTS, Reducible, Resolvers } from "~/types"

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
          typeResolver[name] = property.resolver
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
          queries[name] = endpoint.resolver
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = endpoint.resolver
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
