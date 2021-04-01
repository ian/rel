import { Field } from "@reldb/types"

export function fieldToGQL(fieldName: string, field: Field) {
  const fieldDef = [fieldName]

  fieldDef.push(": ")
  fieldDef.push(field._label)
  if (field._required) fieldDef.push("!")
  if (field._guard) fieldDef.push(` @${field._guard}`)

  return fieldDef.join("")
}
