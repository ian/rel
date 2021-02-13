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
  })

  gqlFields["createdAt"] = "DateTime!"
  gqlFields["updatedAt"] = "DateTime!"

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const { name, schema, resolver } = generateObjectRelation(...relObj)
      gqlFields[name] = schema
      gqlResolver[name] = resolver
    })
  }

  return {
    schema: {
      [label]: gqlFields,
    },
    resolvers: {
      [label]: gqlResolver,
    },
  }
}
