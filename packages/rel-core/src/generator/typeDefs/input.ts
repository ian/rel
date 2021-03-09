import { ReducedType } from "../../types"
import { generateProperty } from "./property"

export function generateInput(name: string, type: ReducedType) {
  const gqlFields = []

  Object.entries(type).forEach((fieldObj) => {
    const [name, property] = fieldObj
    gqlFields.push(generateProperty(name, property, { guards: false }))
  })

  return `input ${name} {
  ${gqlFields.join("\n")}
}`
}
