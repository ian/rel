import _ from "lodash"
import { formatSdl } from "format-graphql"
import { ENDPOINTS, Reducible } from "../types"

import { generateDirectives } from "./directives"
import { generateInput } from "./input"
import { generateType } from "./type"

export function generateTypeDefs(reducible: Reducible) {
  const { inputs, outputs, guards, endpoints } = reducible

  const gql = []

  if (guards) {
    gql.push(generateDirectives(guards))
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

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [name, properties] = entry
      gql.push(generateType(name, properties))
    })
  }

  if (endpoints) {
    let queries = {},
      mutations = {}

    Object.entries(endpoints).forEach((entry) => {
      const [name, endpoint] = entry
      const { target } = endpoint

      switch (target) {
        case ENDPOINTS.ACCESSOR:
          queries[name] = endpoint
          break

        case ENDPOINTS.MUTATOR:
          mutations[name] = endpoint
          break
        default:
          throw new Error(`Unknown endpoint type ${target} for ${name}`)
      }
    })

    if (!_.isEmpty(queries)) gql.push(generateType("Query", queries))
    if (!_.isEmpty(mutations)) gql.push(generateType("Mutation", mutations))
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
