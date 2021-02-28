import { Reducible } from "~/types"

export function generateDirectiveResolvers(reduced: Reducible) {
  return Object.entries(reduced.directives).reduce((acc, dir) => {
    const [name, { resolver }] = dir
    acc[name] = resolver
    return acc
  }, {})
}
