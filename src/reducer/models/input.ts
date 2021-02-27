import { Fields, ReducedType } from "~/types"

export function reduceInput(fields: Fields): ReducedType {
  const reduced = Object.entries(fields).reduce((acc, entry) => {
    const [fieldName, field] = entry
    acc[fieldName] = {
      typeDef: {
        returns: field,
      },
    }
    return acc
  }, {})

  return reduced
}
