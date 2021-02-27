import { Reducible } from "~/types"

export function generateDirectiveResolvers(reduced: Reducible) {
  return Object.entries(reduced.directives).reduce(
    (acc, dir) => {
      const [name, { handler }] = dir
      acc[name] = handler
      return acc
    },
    {}
  )
}