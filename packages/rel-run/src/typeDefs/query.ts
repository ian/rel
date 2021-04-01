import { Endpoints } from "@reldb/types"
import { endpointToGQL } from "./endpoint"

export function queryToGQL(endpoints: Endpoints) {
  const gqlFields = []

  Object.entries(endpoints).forEach((entry) => {
    const [name, endpoint] = entry
    gqlFields.push(endpointToGQL(name, endpoint))
  })

  return `type Query {
  ${gqlFields.join("\n")}
}`
}
