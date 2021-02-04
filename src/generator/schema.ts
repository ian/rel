import pluralize from "pluralize"

type SchemaField = {
  typeName: string
  isRequired: boolean
}

type SchemaFields = {
  [key: string]: SchemaField
}

type SchemaAccessors = {
  find?: boolean
  list?: boolean
}

export type Schema = {
  fields: SchemaFields
  accessors: SchemaAccessors
}

export function convertToSchemaFindQuery(label, def, fields: SchemaFields) {
  // Author(id: UUID!): Author
  const name = `Find${label}`
  return {
    name,
    definition: `${name}(id: UUID!): ${label}`,
  }
}

export function convertToSchemaListQuery(label, def, fields: SchemaFields) {
  const name = `List${pluralize(label)}`

  return {
    name,
    definition: `${name}(limit: Int, skip: Int, order: String): [${label}]!`,
  }
}

export function convertToSchemaType(name, fields: SchemaFields) {
  const gqlFields = []
  gqlFields.push(`id: UUID!`)

  Object.entries(fields).forEach((fieldObj) => {
    const [key, field] = fieldObj
    console.log(field)
    gqlFields.push(`  ${key}: ${field.typeName}${field.isRequired ? "!" : ""}`)
  })

  gqlFields.push(`  createdAt: DateTime!`)
  // gqlFields.push(`  updatedAt: DateTime!`)

  return `type ${name} { 
  ${gqlFields.join("\n")}
}`
}
