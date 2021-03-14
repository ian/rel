import { Fields } from "../types"

export async function resolveFieldsForCreate(
  label: string,
  fields: Fields,
  input
) {
  let values = {}

  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDef] = field
    if (fieldDef._default) {
      values[fieldName] = await fieldDef._default(label, fieldName, input)
    } else {
      values[fieldName] = input[fieldName]
    }
  }

  return values
}

export async function resolveFieldsForUpdate(
  label: string,
  fields: Fields,
  input
) {
  let values = {}

  for (const inputEntry of Object.entries(input)) {
    const [fieldName, inputValue] = inputEntry
    values[fieldName] = inputValue
  }

  return values
}
