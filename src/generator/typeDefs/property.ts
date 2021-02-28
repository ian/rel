import { ReducedProperty, Params, ReducedType } from "~/types"

function generateParams(params: Params) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry
      return `${name}: ${field.toGQL()}`
    })
    .join(", ")
}

export function generateProperty(name, property: ReducedProperty) {
  const fieldDef = [name]
  const { params, returns } = property

  if (params) {
    fieldDef.push(`( ${generateParams(params)} )`)
  }
  fieldDef.push(": ")
  fieldDef.push(returns.toGQL())

  return fieldDef.join("")
}
