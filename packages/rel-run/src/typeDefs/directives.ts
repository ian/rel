import { Guards } from "@reldb/types"

export function directivesToGQL(guards: Guards) {
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
