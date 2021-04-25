import { ReducedGraphQLEndpoint } from "../types"
import { endpointToGQL } from "./endpoint"

export function mutationToGQL(endpoints: ReducedGraphQLEndpoint[]) {
  const gql = []

  endpoints.forEach((endpoint) => {
    gql.push(endpointToGQL(endpoint))
  })

  return `type Mutation {
  ${gql.join("\n")}
}`
}
