import { Reducible, Guards } from "@reldb/types"
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

export function generateDirectives(guards: Guards) {
  return Object.entries(guards)
    .map(([name, d]) => {
      if (d.typeDef) {
        return d.typeDef
      } else {
        return `directive @${name} on OBJECT | FIELD_DEFINITION | INPUT_OBJECT | INPUT_FIELD_DEFINITION`
      }
    })
    .join("\n")
}
