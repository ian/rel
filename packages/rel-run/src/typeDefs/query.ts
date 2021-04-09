import { ReducedGQLEndpoint } from "../types"
import { endpointToGQL } from "./endpoint"

export function queryToGQL(endpoints: ReducedGQLEndpoint[]) {
  const gqlFields = []

  endpoints.forEach((endpoint) => {
    gqlFields.push(endpointToGQL(endpoint))
  })

  return `type Query {
  ${gqlFields.join("\n")}
}`
}
