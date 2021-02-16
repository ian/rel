import { Fields, Relations, Module } from "../types"
import { generateFields } from "./fields"
import { generateObjectRelation } from "./relations"

export function generateModel(
  label,
  { id, timestamps, ...fields }: Fields,
  relations: Relations
): Module {
  const gqlFields = {}
  const gqlResolver = {}

  if (id !== false) {
    gqlFields["id"] = `UUID!`
  }

  Object.assign(gqlFields, generateFields(fields))

  if (timestamps !== false) {
    gqlFields["createdAt"] = "DateTime!"
    gqlFields["updatedAt"] = "DateTime!"
  }

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const { name, schema, resolver } = generateObjectRelation(...relObj)
      gqlFields[name] = schema
      gqlResolver[name] = resolver
    })
  }

  return {
    schema: {
      types: {
        [label]: gqlFields,
      },
    },
    resolvers: {
      [label]: gqlResolver,
    },
  }
}
