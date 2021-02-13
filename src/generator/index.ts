import _ from "lodash"
import { formatSdl } from "format-graphql"

import { Fields } from "../types"

// import { convertToSchemaType } from "./types.old"
import { generateObject } from "./object"
import { generateFind } from "./find"
import { generateList } from "./list"

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

  const typeResolvers = {}
  const queryResolvers = {}
  const mutationResolvers = {}

  Object.entries(obj).forEach((types) => {
    const [name, def] = types
    const { accessors, fields, relations } = def as Schema

    // Generate the type definition
    // typeSchema[name] = convertToSchemaType(name, fields, relations)
    const { schema, resolver } = generateObject(name, fields, relations)
    typeSchema[name] = schema
    typeResolvers[name] = resolver

    // Generate Queries and Mutations
    if (accessors) {
      if (accessors.find) {
        const { schema, resolver } = generateFind(name, accessors.find, fields)
        querySchema[schema.name] = schema.definition
        queryResolvers[resolver.name] = resolver.handler
      }

      if (accessors.list) {
        const { schema, resolver } = generateList(name, accessors.list, fields)
        querySchema[schema.name] = schema.definition
        queryResolvers[resolver.name] = resolver.handler
      }
    }
  })

  const gqlSchema = []
  gqlSchema.push(`
  scalar ID
  scalar Date
  scalar Geo
  scalar Time
  scalar DateTime
  scalar PhoneNumber
  scalar URL
  scalar UUID`)
  gqlSchema.push(Object.values(typeSchema).join("\n\n"))

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

  const schema = gqlSchema
    .map((s) =>
      formatSdl(s, {
        sortDefinitions: false,
        sortFields: false,
      })
    )
    .join("\n\n")

  return {
    schema,
    resolvers: {
      ...typeResolvers,
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
  }
}
