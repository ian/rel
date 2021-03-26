import { cypher, cypher1 } from "../cypher"
import { Fields } from "@reldb/types"

export async function resolveFieldsForCreate(
  label: string,
  fields: Fields,
  input
) {
  let values = {}

  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDef] = field
    if (fieldDef._default) {
      if (typeof fieldDef._default === "function") {
        values[fieldName] = await fieldDef._default({
          label,
          fieldName,
          values: input,
          cypher,
          cypher1,
        })
      } else {
        values[fieldName] = await fieldDef._default
      }
    } else {
      values[fieldName] = input[fieldName]
    }
  }

  return values
}

export async function resolveFieldsForUpdate(input) {
  let values = {}

  for (const inputEntry of Object.entries(input)) {
    const [fieldName, inputValue] = inputEntry
    values[fieldName] = inputValue
  }

  return values
}
