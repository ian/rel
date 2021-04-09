import { ReducedGQLEndpoint } from "../types"
import { paramsToGQL } from "./params"

export function endpointToGQL(endpoint: ReducedGQLEndpoint) {
  const { label, guard, params, returns } = endpoint
  const gql = [label]

  if (params) {
    gql.push(`( ${paramsToGQL(params)} )`)
  }
  gql.push(": ")

  gql.push(returns._label)
  if (returns._required) gql.push("!")

  if (guard) gql.push(` @${guard}`)

  return gql.join("")
}
