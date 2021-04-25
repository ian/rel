import { ReducibleDirectives } from "../types"

export function directivesToGQL(guards: ReducibleDirectives) {
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
