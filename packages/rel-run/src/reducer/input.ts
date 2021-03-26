import { Fields, Input } from "@reldb/types"

export function reduceInput(fields: Fields): Input {
  const reduced = Object.entries(fields).reduce((acc, entry) => {
    const [fieldName, field] = entry
    acc[fieldName] = {
      returns: field,
    }
    return acc
  }, {})

  return reduced
}
