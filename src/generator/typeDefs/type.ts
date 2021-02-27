import { ReducedTypeFieldParams, ReducedField, ReducedType } from "~/types"

function generateParams(params: ReducedTypeFieldParams) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry
      return `${name}: ${field.toGQL()}`
    })
    .join(", ")
}

function generateField(name, field: ReducedField) {
  const { typeDef } = field

  if (!typeDef) throw new Error(`Missing typedef for ${name}`)

  if (typeof typeDef === "string") {
    return typeDef
  } else {
    const { params, returns } = typeDef

    const fieldDef = [name]
    if (params) {
      fieldDef.push(`( ${generateParams(params)} )`)
    }
    fieldDef.push(": ")
    fieldDef.push(returns.toGQL())

    return fieldDef.join("")
  }
}

export function generateFields(fields: ReducedType) {
  // const { guards = true } = opts
  const gqlFields = []

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj
    gqlFields.push(generateField(name, def))
  })

  return gqlFields.join("\n")
}

export function generateType(name: string, fields: ReducedType) {
  return `type ${name} {
  ${generateFields(fields)}
}`
}
