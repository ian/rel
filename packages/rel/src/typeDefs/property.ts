import { ReducibleProperty } from "../types"
import { paramsToGQL } from "./params"

export function propertyToGQL(fieldName: string, property: ReducibleProperty) {
  const { returns, params, guard, required } = property
  const gql = [fieldName]

  if (params) {
    gql.push(`( ${paramsToGQL(params)} )`)
  }
  gql.push(": ")
  gql.push(returns)
  if (required) gql.push("!")

  // if (guard) gql.push(` @${guard.name}`)

  return gql.join("")
}
