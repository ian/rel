import _ from "lodash"
import { formatSdl } from "format-graphql"
import { ENDPOINTS, Reducible } from "~/types"

import { generateInput } from "./input"
import { generateType } from "./type"

export function generateTypeDefs(reducible: Reducible) {
  // console.log("reducible", reducible)
  const { inputs, types, directives, endpoints } = reducible

  const gql = []

  if (directives) {
    const gqlDirectives = Object.values(directives)
      .map((d) => d.typeDef)
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

  if (inputs) {
    Object.entries(inputs).forEach((entry) => {
      const [name, properties] = entry
      gql.push(generateInput(name, properties))
    })
  }

  if (types) {
    Object.entries(types).forEach((entry) => {
      const [name, properties] = entry
      gql.push(generateType(name, properties))
    })
  }

  if (endpoints) {
    // console.log("endpoints", endpoints)
    let queries = {},
      mutations = {}

    Object.entries(endpoints).forEach((entry) => {
      const [name, endpoint] = entry
      const { type } = endpoint

      switch (type) {
        case ENDPOINTS.ACCESSOR:
          queries[name] = endpoint.typeDef
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = endpoint.typeDef
          break
        default:
          throw new Error(`Unknown endpoint type ${type} for ${name}`)
      }
    })

    if (!_.isEmpty(queries)) gql.push(generateType("Query", queries))
    if (!_.isEmpty(mutations)) gql.push(generateType("Mutation", mutations))
  }

  // if (types) {
  //   const { Query, Mutation, ...restOfTypes } = types

  //   if (Query) {
  //     gql.push(generateType("Query", Query))
  //   }

  //   if (Mutation) {
  //     gql.push(generateType("Mutation", Mutation))
  //   }

  //   if (restOfTypes) {
  //     Object.entries(restOfTypes).forEach((entry) => {
  //       const [name, fields] = entry
  //       gql.push(generateType(name, fields))
  //     })
  //   }
  // }

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
