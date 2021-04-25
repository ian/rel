import _ from "lodash"
import { formatSdl } from "format-graphql"
import { Reduced } from "../types"
import { splitGraphQLEndpoints } from "../util/endpoints"

import {
  directivesToGQL,
  inputToGQL,
  outputToGQL,
  queryToGQL,
  mutationToGQL,
} from "../typeDefs"

export function generateTypeDefs(reduced: Reduced) {
  const { inputs, outputs, directives, graphqlEndpoints } = reduced

  const gql = []

  if (directives) {
    gql.push(directivesToGQL(directives))
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
      const [name, input] = entry
      if (_.isEmpty(input.properties)) {
        throw new Error(
          `${name} has no fields or relations, please add at least one.`
        )
      }
      gql.push(inputToGQL(name, input))
    })
  }

  if (outputs) {
    Object.entries(outputs).forEach((entry) => {
      const [name, properties] = entry
      gql.push(outputToGQL(name, properties))
    })
  }

  if (graphqlEndpoints) {
    const { queries, mutations } = splitGraphQLEndpoints(graphqlEndpoints)
    if (!_.isEmpty(queries)) gql.push(queryToGQL(queries))
    if (!_.isEmpty(mutations)) gql.push(mutationToGQL(mutations))
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
        console.error(`
Error during GQL compilation
${JSON.stringify(typeStr, null, 2)}

${err.message}
`)
      }
    })
    .join("\n")
    .trim()
}
