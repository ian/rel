import _ from "lodash"
import {
  Schema,
  convertToSchemaType,
  convertToSchemaFindQuery,
  convertToSchemaListQuery,
} from "./schema"
import {
  convertToResoverFindQuery,
  convertToResoverListQuery,
} from "./resolvers"

export function generate(obj) {
  const typeSchema = {}
  const querySchema = {}
  const mutationSchema = {}

  const queryResolvers = {}
  const mutationResolvers = {}

  Object.entries(obj).forEach((types) => {
    const [name, def] = types
    const { fields, accessors } = def as Schema

    // Generate the type definition
    typeSchema[name] = convertToSchemaType(name, fields)

    // Generate Queries and Mutations
    if (accessors) {
      if (accessors.find) {
        const {
          name: schemaName,
          definition: schemaDef,
        } = convertToSchemaFindQuery(name, accessors.find, fields)
        querySchema[schemaName] = schemaDef

        const {
          name: resolverName,
          handler: resolverHandler,
        } = convertToResoverFindQuery(name, accessors.find)

        queryResolvers[resolverName] = resolverHandler
      }

      if (accessors.list) {
        const {
          name: schemaName,
          definition: schemaDef,
        } = convertToSchemaListQuery(name, accessors.list, fields)
        querySchema[schemaName] = schemaDef

        const {
          name: resolverName,
          handler: resolverHandler,
        } = convertToResoverListQuery(name, accessors.list)
        queryResolvers[resolverName] = resolverHandler
      }
    }
  })

  const gqlSchema = [
    `
scalar ID
scalar Date
scalar Time
scalar DateTime
scalar PhoneNumber
scalar URL
scalar UUID`,
    Object.values(typeSchema).join("\n\n"),
  ]

  // if (!_.isEmpty(querySchema)) {
  gqlSchema.push(`type Query {
  ${Object.values(querySchema).join("\n  ")}
}`)
  // }

  // if (!_.isEmpty(mutationSchema)) {
  gqlSchema.push(`type Mutation {
  ${Object.values(mutationSchema).join("\n  ")}
  SystemStatus: Boolean!
}`)
  // }

  return {
    schema: gqlSchema.join("\n\n"),
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
  }
}
