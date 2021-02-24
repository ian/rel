import { formatSdl } from "format-graphql"
import { Reducible } from "~/types"
import { generateType } from "./type"

export function generateTypeDefs(reducible: Reducible) {
  const { types, directives } = reducible

  const gql = []

  if (directives) {
    const gqlDirectives = Object.values(directives)
      .map((d) => d.schema)
      .join("\n")

    gql.push(gqlDirectives)
  }

  // add scalars
  // @todo make dynamic
  gql.push(`scalar ID
scalar Date
scalar Geo
scalar Time
scalar DateTime
scalar PhoneNumber
scalar URL
scalar UUID`)

  if (types) {
    const { Query, Mutation, ...restOfTypes } = types

    if (Query) {
      gql.push(generateType("Query", Query))
    }

    if (Mutation) {
      gql.push(generateType("Mutation", Mutation))
    }

    if (restOfTypes) {
      Object.entries(restOfTypes).forEach((entry) => {
        const [name, fields] = entry
        gql.push(generateType(name, fields))
      })
    }
  }

  console.log(gql.join("\n\n"))

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
