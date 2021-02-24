import { Fields, ReducedType } from "~/types"

export function generateInput(fields: Fields): ReducedType {
  const reduced = Object.entries(fields).reduce((acc, entry) => {
    const [fieldName, field] = entry
    acc[fieldName] = {
      returns: field,
    }
    return acc
  }, {})

  return reduced
}
