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

export function convertToSchemaFindQuery(name, def, fields: SchemaFields) {
  // Author(id: UUID!): Author
  return [name, `${name}(id: UUID!): ${name}`]
}

export function convertToSchemaListQuery(name, def, fields: SchemaFields) {
  const pluralized = pluralize(name)

  // Authors(limit: Int, skip: Int, order: String): [Author]!
  return [
    pluralized,
    `${pluralized}(limit: Int, skip: Int, order: String): [${name}]!`,
  ]
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
