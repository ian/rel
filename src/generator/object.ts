import { generateObjectFields } from "./fields"
import { generateObjectRelation } from "./relations"
import { Fields, Relations } from "../types"

export function generateObject(name, fields: Fields, relations: Relations) {
  const gqlFields = []
  const gqlResolver = {}

  gqlFields.push(`id: UUID!`)

  Object.entries(fields).forEach((fieldObj) => {
    gqlFields.push(generateObjectFields(...fieldObj))
  })

  gqlFields.push(`createdAt: DateTime!`)
  gqlFields.push(`updatedAt: DateTime!`)

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const { name, schema, resolver } = generateObjectRelation(...relObj)
      gqlFields.push(schema)
      gqlResolver[name] = resolver
    })
  }

  return {
    schema: `type ${name} { 
      ${gqlFields.join("\n")}
    }`,
    resolver: gqlResolver,
  }
}
