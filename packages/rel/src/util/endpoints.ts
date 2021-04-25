import {
  GraphQLEndpoint,
  ReducedGraphQLEndpoint,
  GraphQLOperation,
  HTTPEndpoint,
  Endpoint,
} from "../types"

type SplitProps = {
  queries: ReducedGraphQLEndpoint[]
  mutations: ReducedGraphQLEndpoint[]
}

export function splitGraphQLEndpoints(
  endpoints: ReducedGraphQLEndpoint[]
): SplitProps {
  const queries = []
  const mutations = []

  endpoints.forEach((endpoint) => {
    switch (endpoint.operation) {
      case GraphQLOperation.QUERY:
        queries.push(endpoint)
        break

      case GraphQLOperation.MUTATION:
        mutations.push(endpoint)
        break
      default:
        throw new Error(
          `Unknown endpoint type '${endpoint.operation}' for ${name}`
        )
    }
  })

  return { queries, mutations }
}
