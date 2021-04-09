import { ReducedInput } from "../types"
import { fieldToGQL } from "./field"

export function inputToGQL(name: string, type: ReducedInput) {
  const gqlFields = []

  Object.entries(type).forEach((field) => {
    gqlFields.push(fieldToGQL(...field))
  })

  return `input ${name} {
  ${gqlFields.join("\n")}
}`
}
