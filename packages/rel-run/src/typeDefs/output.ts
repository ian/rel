import { ReducedOutput } from "../types"
import { fieldToGQL } from "./field"

export function outputToGQL(name: string, type: ReducedOutput) {
  const gqlFields = []

  Object.entries(type).forEach((field) => {
    gqlFields.push(fieldToGQL(...field))
  })

  return `type ${name} {
  ${gqlFields.join("\n")}
}`
}
