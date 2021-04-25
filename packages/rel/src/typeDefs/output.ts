import { ReducibleOutput } from "../types"
import { propertyToGQL } from "./property"

export function outputToGQL(name: string, type: ReducibleOutput) {
  const gqlFields = []

  Object.entries(type.properties).forEach((field) => {
    gqlFields.push(propertyToGQL(...field))
  })

  return `type ${name} {
  ${gqlFields.join("\n")}
}`
}
