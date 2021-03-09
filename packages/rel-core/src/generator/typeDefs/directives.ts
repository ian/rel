import { Guards } from "../../types"

// More reading on GQL Directives; https://spec.graphql.org/June2018/#sec-Type-System.Directives

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
