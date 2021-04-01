import { Input } from "@reldb/types"
import { fieldToGQL } from "./field"

export function inputToGQL(name: string, type: Input) {
  const gqlFields = []

  Object.entries(type).forEach((field) => {
    gqlFields.push(fieldToGQL(...field))
  })

  return `input ${name} {
  ${gqlFields.join("\n")}
}`
}
