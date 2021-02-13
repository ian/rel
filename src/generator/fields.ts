import { ConfigField } from "../server/types"

export function generateObjectFields(name: string, field: ConfigField) {
  return `${name}: ${field.gqlName}${field.isRequired ? "!" : ""}`
}
