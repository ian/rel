import { generateObjectFields } from "./fields"
import { generateObjectRelation } from "./relations"
import { ConfigFields, ConfigRelations } from "../server/types"

export function generateObject(
  label,
  fields: ConfigFields,
  relations: ConfigRelations
) {
  const gqlFields = {}
  const gqlResolver = {}

  gqlFields["id"] = `UUID!`

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj
    gqlFields[name] = def.gqlName
    // return `${name}: ${field.gqlName}${field.isRequired ? "!" : ""}`
    // gqlFields.push(generateObjectFields(...fieldObj))
  })

  gqlFields["createdAt"] = "DateTime!"
  gqlFields["updatedAt"] = "DateTime!"

  // gqlFields.push(`createdAt: DateTime!`)
  // gqlFields.push(`updatedAt: DateTime!`)

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const { name, schema, resolver } = generateObjectRelation(...relObj)
      gqlFields[name] = schema
      // gqlFields.push(schema)
      gqlResolver[name] = resolver
    })
  }

  const schema = {}
  schema[label] = gqlFields

  return {
    schema,
    resolvers: {
      [label]: gqlResolver,
    },
  }
}
