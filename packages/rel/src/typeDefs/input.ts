import { ReducibleInput } from "../types"
import { propertyToGQL } from "./property"

export function inputToGQL(name: string, type: ReducibleInput) {
  const gqlFields = []

  Object.entries(type.properties).forEach((field) => {
    gqlFields.push(propertyToGQL(...field))
  })

  return `input ${name} {
  ${gqlFields.join("\n")}
}`
}
