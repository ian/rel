import {
  ReducedTypeFieldParams,
  ReducedTypeField,
  ReducedTypeFields,
  ReducedType,
} from "~/types"

function generateParams(params: ReducedTypeFieldParams) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry

      const fieldDef = [name]
      fieldDef.push(": ")
      fieldDef.push(field._gqlName)
      if (field._required) fieldDef.push("!")

      return fieldDef.join("")
    })
    .join(", ")
}

function generateField(name, field: ReducedTypeField) {
  const { params, returns } = field
  const fieldDef = [name]

  if (params) {
    fieldDef.push(`( ${generateParams(params)} )`)
  }
  fieldDef.push(": ")
  fieldDef.push(returns._gqlName)
  if (returns._required) fieldDef.push("!")
  if (returns._guard) fieldDef.push(` @${returns._guard}`)

  return fieldDef.join("")
}

export function generateFields(fields: ReducedTypeFields) {
  // const { guards = true } = opts
  const gqlFields = []

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj
    gqlFields.push(generateField(name, def))
  })

  return gqlFields.join("\n")
}

export function generateType(name: string, fields: ReducedTypeFields) {
  return `type ${name} {
  ${generateFields(fields)}
}`
}
