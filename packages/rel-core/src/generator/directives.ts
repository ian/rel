import { Reducible } from "../types"
import { cypher, cypher1 } from "../cypher"

function augmentResolver(resolver) {
  return async (next, src, args, context) => {
    await resolver({
      src,
      args,
      context,
      cypher,
      cypher1,
    })
    next()
  }
}

export function generateDirectiveResolvers(reduced: Reducible) {
  return Object.entries(reduced.guards).reduce((acc, dir) => {
    const [name, { resolver }] = dir
    acc[name] = augmentResolver(resolver)
    return acc
  }, {})
}
