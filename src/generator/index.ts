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
type Resolvers = {
  [name: string]: Resolver
}

type GeneratorReply = {
  schema: Schema
  resolvers: Resolvers
}

export function generate(obj) {
  // const typeSchema = {}
  // const querySchema = {}
  // const mutationSchema = {}

  // const typeResolvers = {}
  // const queryResolvers = {}
  // const mutationResolvers = {}
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
    console.log("reducer", add)
    _.merge(reducedSchema, add.schema)
    _.merge(reducedResolvers, add.resolvers)
  }

  Object.entries(obj).forEach(([name, def]) => {
    const { accessors, fields, relations } = def as ConfigSchema

    // Generate the type definition
    // typeSchema[name] = convertToSchemaType(name, fields, relations)
    // const { schema, resolver } = generateObject(name, fields, relations)
    const objectReply = generateObject(name, fields, relations)
    // @ts-ignore
    reducer(objectReply)
    // typeSchema[name] = schema
    // typeResolvers[name] = resolver

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

  // console.log("reducedSchema", reducedSchema)
  // console.log("reducedResolvers", reducedResolvers)

  //   gqlSchema.push(Object.values(typeSchema).join("\n\n"))

  //   if (!_.isEmpty(querySchema)) {
  //     gqlSchema.push(`type Query {
  //   ${Object.values(querySchema).join("\n  ")}
  // }`)
  //   } else {
  //     gqlSchema.push(`type Query {
  //   # Add accessors to remove placeholder
  //   _ : Boolean
  // }`)
  //   }

  //   if (!_.isEmpty(mutationSchema)) {
  //     gqlSchema.push(`type Mutation {
  //   ${Object.values(mutationSchema).join("\n  ")}
  //   SystemStatus: Boolean!
  // }`)
  //   } else {
  //     gqlSchema.push(`type Mutation {
  //   # Add accessors to remove placeholder
  //   _ : Boolean
  // }`)
  //   }

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

  const schema = gqlSchema
    // .map((s) =>
    //   formatSdl(s, {
    //     sortDefinitions: false,
    //     sortFields: false,
    //   })
    // )
    .join("\n\n")

  console.log("schema", schema)

  return {
    schema,
    resolvers: reducedResolvers,
    // schema,
    // resolvers: {
    //   ...typeResolvers,
    //   Query: queryResolvers,
    //   Mutation: mutationResolvers,
    // },
  }
}
