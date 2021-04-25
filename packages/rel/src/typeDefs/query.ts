import { ReducedGraphQLEndpoint } from "../types"
import { endpointToGQL } from "./endpoint"

export function queryToGQL(endpoints: ReducedGraphQLEndpoint[]) {
  const gql = []

  endpoints.forEach((endpoint) => {
    gql.push(endpointToGQL(endpoint))
  })

  return `type Query {
  ${gql.join("\n")}
}`
}
