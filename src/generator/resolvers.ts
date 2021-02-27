import { Reducible } from "~/types"

export function generateResolvers(reduced: Reducible) {
  // For now, resolvers are in the right format for graphql(). This may change.
  return reduced.resolvers
}