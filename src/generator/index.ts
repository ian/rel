import { formatSdl } from "format-graphql"
import _ from "lodash"
import { Config, ConfigSchema } from "../server/types"
import { generateFind, generateList } from "./accessors"
import { generateObject } from "./object"
import { Directives, GeneratorReply, Resolvers, Schema } from "./types"

function map(obj: Config): GeneratorReply {
  const schema = {
    Query: {
      Ping: "String",
    },
    Mutation: {
      Ping: "String",
    },
  } as Schema

  const resolvers = {
    Query: {
      Ping: () => {
        return new Date().toISOString()
      },
    },
    Mutation: {
      Ping: () => {
        return new Date().toISOString()
      },
    },
  } as Resolvers

  const directives = {} as Directives

  const merge = (add: GeneratorReply) => {
    _.merge(schema, add.schema)
    _.merge(resolvers, add.resolvers)
    _.merge(directives, add.directives)
  }

  if (obj.auth) merge(obj.auth())

  Object.entries(obj.schema).forEach(([name, def]) => {
    const { accessors, fields, relations } = def as ConfigSchema

    // Generate the type definition
    const objectReply = generateObject(name, fields, relations)
    merge(objectReply)

    // Generate Queries and Mutations
    if (accessors) {
      if (accessors.find) {
        const generatedFind = generateFind(name, accessors.find, fields)
        merge(generatedFind)
      }

      if (accessors.list) {
        const generatedList = generateList(name, accessors.list, fields)
        merge(generatedList)
      }
    }
  })

  return {
    schema,
    resolvers,
    directives,
  }
}

function reducer(mapped: GeneratorReply) {
  const gqlSchema = []

  // add directives
  const gqlDirectives = Object.values(mapped.directives)
    .map((d) => d.schema)
    .join("\n")
  gqlSchema.push(gqlDirectives)

  // add scalars
  // @todo make dynamic
  gqlSchema.push(`scalar ID
scalar Date
scalar Geo
scalar Time
scalar DateTime
scalar PhoneNumber
scalar URL 
scalar UUID`)

  // generate types from mapped schema
  const typeSchema = Object.entries(mapped.schema)
    .map(([label, def]) => {
      const fields = Object.entries(def).map(([fieldName, gqlDef]) => {
        return `${fieldName}: ${gqlDef}`
      })

      return `type ${label} { ${fields.join("\n")} }`
    })
    .map((typeStr) => {
      try {
        // I find it's best to just run through a formatter rather than rely on modules to generate clean looking GQL
        return formatSdl(typeStr, {
          sortDefinitions: false,
          sortFields: false,
        })
      } catch {
        console.error("Error during GQL compilation", typeStr)
      }
    })
    .join("\n")

  gqlSchema.push(typeSchema)

  const schema = gqlSchema.join("\n\n")
  const resolvers = mapped.resolvers // already in the proper format
  const directives = Object.entries(mapped.directives).reduce((acc, dir) => {
    const [name, { handler }] = dir
    acc[name] = handler
    return acc
  }, {})

  return {
    schema,
    resolvers,
    directives,
  }
}

export function generate(obj: Config) {
  // generate the master level object configs
  const mapped = map(obj)

  // Reduce mapped to the proper format
  const { schema, directives, resolvers } = reducer(mapped)

  return {
    schema,
    resolvers,
    directives,
  }
}
