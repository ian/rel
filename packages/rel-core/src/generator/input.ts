import { Input } from "../types"
import { generateProperty } from "./property"

export function generateInput(name: string, type: Input) {
  const gqlFields = []

  Object.entries(type).forEach((fieldObj) => {
    const [name, property] = fieldObj
    gqlFields.push(generateProperty(name, property))
  })

  return `input ${name} {
  ${gqlFields.join("\n")}
}`
}
