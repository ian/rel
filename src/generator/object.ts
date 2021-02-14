import { generateObjectRelation } from "./relations"
import { ConfigFields, ConfigRelations } from "../server/types"

export function generateObject(
  label,
  { id, timestamps, ...fields }: ConfigFields,
  relations: ConfigRelations
) {
  const gqlFields = {}
  const gqlResolver = {}

  if (id !== false) {
    gqlFields["id"] = `UUID!`
  }

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj

    gqlFields[name] =
      def._gqlName +
      (def._required ? "!" : "") +
      (def._guard ? ` @${def._guard}` : "")
  })

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
      [label]: gqlFields,
    },
    resolvers: {
      [label]: gqlResolver,
    },
  }
}
