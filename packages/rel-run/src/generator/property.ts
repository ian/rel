import { Property, Params } from "@reldb/types"

function generateParams(params: Params) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry
      return `${name}: ${field.toGQL()}`
    })
    .join(", ")
}

export function generateProperty(name, property: Property) {
  const fieldDef = [name]
  const { guard, params, returns } = property

  if (params) {
    fieldDef.push(`( ${generateParams(params)} )`)
  }
  fieldDef.push(": ")
  fieldDef.push(returns.toGQL())
  if (guard) fieldDef.push(` @${guard}`)

  return fieldDef.join("")
}
