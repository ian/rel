import { formatSdl } from "format-graphql"
import { Fields, ReducedTypes } from "~/types"
import { generateFields } from "./typeDefs/fields"

function generateType(name, fields: Fields) {
  return `type ${name} {
  ${generateFields(fields)}
}`
}

export function generateTypeDefs(reduced: ReducedTypes) {
  const { Query, ...types } = reduced

  const gql = []

  // gql.push(generateType("Query", Query))
  Object.entries(types).map((entry) => {
    const [name, fields] = entry
    gql.push(generateType(name, fields))
  })

  return gql
    .map((typeStr) => {
      if (!typeStr) return null
      try {
        // I find it's best to just run through a formatter rather than rely on modules to generate clean looking GQL
        return formatSdl(typeStr, {
          sortDefinitions: false,
          sortFields: false,
        })
      } catch (err) {
        console.error(
          "Error during GQL compilation",
          JSON.stringify(typeStr, null, 2),
          err.message
        )
      }
    })
    .join("\n")
    .trim()
}
