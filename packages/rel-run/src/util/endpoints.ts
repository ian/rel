import { ReducedGQLEndpoint, GraphQLOperationType } from "../types"

type SplitProps = {
  queries: ReducedGQLEndpoint[]
  mutations: ReducedGQLEndpoint[]
}

export function splitEndpoints(endpoints: ReducedGQLEndpoint[]): SplitProps {
  const queries = []
  const mutations = []

  endpoints.forEach((endpoint) => {
    switch (endpoint.type) {
      case GraphQLOperationType.QUERY:
        queries.push(endpoint)
        break

      case GraphQLOperationType.MUTATION:
        mutations.push(endpoint)
        break
      default:
        throw new Error(`Unknown endpoint type '${endpoint.type}' for ${name}`)
    }
  })

  return { queries, mutations }
}

export function splitGraphQLEndpoints(
  endpoints: ReducedGQLEndpoint[]
): SplitProps {
  const queries = []
  const mutations = []

  endpoints.forEach((endpoint) => {
    switch (endpoint.type) {
      case GraphQLOperationType.QUERY:
        queries.push(endpoint)
        break

      case GraphQLOperationType.MUTATION:
        mutations.push(endpoint)
        break
      default:
        throw new Error(`Unknown endpoint type '${endpoint.type}' for ${name}`)
    }
  })

  return { queries, mutations }
}
