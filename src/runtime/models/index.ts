import { uuid, dateTime } from "../../fields"
import { Fields, Relations, Reducible } from "~/types"

import { generateFields } from "./fields"
import { generateObjectRelation } from "./relations"

export function modelToRuntime(
  label,
  { id, timestamps, ...fields }: Fields,
  relations: Relations
): Reducible {
  const gqlFields = {}
  const gqlResolver = {}

  if (id !== false) {
    gqlFields["id"] = { returns: uuid() }
  }

  Object.assign(gqlFields, generateFields(fields))

  if (timestamps !== false) {
    gqlFields["createdAt"] = { returns: dateTime() }
    gqlFields["updatedAt"] = { returns: dateTime() }
  }

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const { name, schema, resolver } = generateObjectRelation(...relObj)
      gqlFields[name] = schema
      gqlResolver[name] = resolver
    })
  }

  return {
    types: {
      [label]: gqlFields,
    },
    resolvers: {
      [label]: gqlResolver,
    },
  }
}
