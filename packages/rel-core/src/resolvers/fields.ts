import { Fields } from "../types"

export async function resolveFieldsForCreate(
  label: string,
  fields: Fields,
  input
) {
  let values = {}

  for (const field of Object.entries(fields)) {
    const [fieldName, fieldDef] = field
    values[fieldName] = await fieldDef.resolve(label, fieldName, input)
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
