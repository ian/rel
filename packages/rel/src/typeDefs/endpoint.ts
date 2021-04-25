import { ReducedGraphQLEndpoint } from "../types"
import { propertyToGQL } from "./property"

export function endpointToGQL(e: ReducedGraphQLEndpoint) {
  const { name, ...property } = e
  return propertyToGQL(name, property)
}
