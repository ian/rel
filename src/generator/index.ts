import _ from "lodash"
// import {
//   Schema,
//   convertToSchemaType,
//   // convertToSchemaFindQuery,
//   convertToSchemaListQuery,
// } from "./schema.old"

// import {
//   // convertToResoverFindQuery,
//   convertToResoverListQuery,
// } from "./resolvers.old"

import { Fields } from "./fields"
import { convertToSchemaType } from "./types"
import { convertToSchemaFindQuery, convertToResoverFindQuery } from "./find"
import { convertToSchemaListQuery, convertToResoverListQuery } from "./list"

type Accessors = {
  find?: boolean
  list?: boolean
}

type Relations = {}

export type Schema = {
  accessors: Accessors
  fields: Fields
  relations: Relations
}

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
scalar Geo
scalar Time
scalar DateTime
scalar PhoneNumber
scalar URL
scalar UUID`,
    Object.values(typeSchema).join("\n\n"),
  ]

  if (!_.isEmpty(querySchema)) {
    gqlSchema.push(`type Query {
  ${Object.values(querySchema).join("\n  ")}
}`)
  } else {
    gqlSchema.push(`type Query { 
  # Add accessors to remove placeholder
  _ : Boolean 
}`)
  }

  if (!_.isEmpty(mutationSchema)) {
    gqlSchema.push(`type Mutation {
  ${Object.values(mutationSchema).join("\n  ")}
  SystemStatus: Boolean!
}`)
  } else {
    gqlSchema.push(`type Mutation { 
  # Add accessors to remove placeholder
  _ : Boolean 
}`)
  }

  return {
    schema: gqlSchema.join("\n\n"),
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
  }
}
