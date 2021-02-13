import _ from "lodash"
import { formatSdl } from "format-graphql"

import { ConfigSchema } from "../server/types"
import { RuntimeParams, ResolvableObject } from "../resolvers"

import { generateObject } from "./object"
import { generateFind, generateList } from "./accessors"

type SchemaObject = {
  [fieldName: string]: string
}

type Schema = {
  [name: string]: SchemaObject
}

type Resolver = (...RuntimeParams) => ResolvableObject
type Resolvers =
  | {}
  | {
      [name: string]: Resolver
    }

type GeneratorReply = {
  schema: Schema
  resolvers: Resolvers
}

export function generate(obj) {
  const reducedSchema = {
    Query: {
      Ping: "Boolean",
    },
    Mutation: {
      Ping: "Boolean",
    },
  }
  const reducedResolvers = {
    Query: {},
    Mutation: {},
  }

  const reducer = (add: GeneratorReply) => {
    _.merge(reducedSchema, add.schema)
    _.merge(reducedResolvers, add.resolvers)
  }

  Object.entries(obj).forEach(([name, def]) => {
    const { accessors, fields, relations } = def as ConfigSchema

    // Generate the type definition
    const objectReply = generateObject(name, fields, relations)
    reducer(objectReply)

    // Generate Queries and Mutations
    if (accessors) {
      if (accessors.find) {
        const generatedFind = generateFind(name, accessors.find, fields)
        reducer(generatedFind)
      }

      if (accessors.list) {
        const generatedList = generateList(name, accessors.list, fields)
        reducer(generatedList)
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

  const typeSchema = Object.entries(reducedSchema)
    .map(([label, def]) => {
      const fields = Object.entries(def).map(([fieldName, gqlDef]) => {
        return `${fieldName}: ${gqlDef}`
      })

      return `type ${label} { ${fields.join("\n")} }`
    })
    .map((typeStr) =>
      formatSdl(typeStr, {
        sortDefinitions: false,
        sortFields: false,
      })
    )
    .join("\n")

  gqlSchema.push(typeSchema)

  const schema = gqlSchema.join("\n\n")

  return {
    schema,
    resolvers: reducedResolvers,
  }
}
