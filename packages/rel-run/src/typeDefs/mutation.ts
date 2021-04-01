import { Endpoints } from "@reldb/types"
import { endpointToGQL } from "./endpoint"

export function mutationToGQL(endpoints: Endpoints) {
  const gqlFields = []

  Object.entries(endpoints).forEach((entry) => {
    const [name, endpoint] = entry
    gqlFields.push(endpointToGQL(name, endpoint))
  })

  return `type Mutation {
  ${gqlFields.join("\n")}
}`
}
