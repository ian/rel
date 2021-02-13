import { Field } from "../types"

export function generateObjectFields(name: string, field: Field) {
  return `${name}: ${field.gqlName}${field.isRequired ? "!" : ""}`
}
