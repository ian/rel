import { Fields } from "./fields"

export function convertToSchemaType(name, fields: Fields) {
  const gqlFields = []
  gqlFields.push(`id: UUID!`)

  Object.entries(fields).forEach((fieldObj) => {
    const [key, field] = fieldObj
    gqlFields.push(`  ${key}: ${field.typeName}${field.isRequired ? "!" : ""}`)
  })

  gqlFields.push(`  createdAt: DateTime!`)
  // gqlFields.push(`  updatedAt: DateTime!`)

  return `type ${name} { 
  ${gqlFields.join("\n")}
}`
}
