import _ from "lodash"
import { formatSdl } from "format-graphql"
import { ENDPOINTS, Reduced } from "../types"

import {
  directivesToGQL,
  inputToGQL,
  outputToGQL,
  queryToGQL,
  mutationToGQL,
} from "../typeDefs"

export function generateTypeDefs(reducible: Reduced) {
  const { inputs, outputs, guards, endpoints } = reducible

  const gql = []

  if (guards) {
    gql.push(directivesToGQL(guards))
  }

  // add scalars
  // @todo make dynamic
  gql.push(`
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
      if (_.isEmpty(properties)) {
        throw new Error(
          `${name} has no fields or relations, please add at least one.`
        )
      }
      const input = inputToGQL(name, properties)
      gql.push(input)
    })
  }

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [name, properties] = entry
      const output = outputToGQL(name, properties)
      gql.push(output)
    })
  }

  let queries = {}
  let mutations = {}

  if (endpoints) {
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
          throw new Error(`Unknown endpoint type '${target}' for ${name}`)
      }
    })
  }

  if (!_.isEmpty(queries)) gql.push(queryToGQL(queries))
  if (!_.isEmpty(mutations)) gql.push(mutationToGQL(mutations))

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
