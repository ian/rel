import { formatSdl } from "format-graphql"
import { Fields, ReducedTypes } from "~/types"
import { generateType } from "./type"

export function generateTypeDefs(reduced: ReducedTypes) {
  const { Query, Mutation, ...types } = reduced

  const gql = []

  if (Query) {
    gql.push(generateType("Query", Query))
  }

  if (Mutation) {
    gql.push(generateType("Mutation", Mutation))
  }

  if (types) {
    Object.entries(types).forEach((entry) => {
      const [name, fields] = entry
      gql.push(generateType(name, fields))
    })
  }

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
