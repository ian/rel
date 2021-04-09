import { ReducedGQLEndpoint } from "../types"
import { endpointToGQL } from "./endpoint"

export function mutationToGQL(endpoints: ReducedGQLEndpoint[]) {
  const gqlFields = []

  endpoints.forEach((endpoint) => {
    gqlFields.push(endpointToGQL(endpoint))
  })

  return `type Mutation {
  ${gqlFields.join("\n")}
}`
}
