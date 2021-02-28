import { ReducedType } from "~/types"
import { generateProperty } from "./property"

export function generateType(name: string, type: ReducedType) {
  const gqlFields = []

  Object.entries(type).forEach((fieldObj) => {
    const [name, property] = fieldObj
    gqlFields.push(generateProperty(name, property))
  })

  return `type ${name} {
  ${gqlFields.join("\n")}
}`
}
