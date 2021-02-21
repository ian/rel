import { formatSdl } from "format-graphql"
import _ from "lodash"
import { makeExecutableSchema } from "@graphql-tools/schema"

import {
  Runtime,
  Model,
  Module,
  CallableModule,
  RuntimeTypes,
  RuntimeInputs,
  RuntimeResolvers,
  RuntimeDirectives,
} from "~/types"

import { generateFind, generateList } from "./accessors"
import { generateMutators } from "./mutators"
import { generateModel } from "./models"

class Generator {
  // @todo - add scalars, directives

  inputs = {
    ...DEFAULT_INPUTS,
  } as RuntimeInputs

  types = {
    ...DEFAULT_TYPES,
  } as RuntimeTypes

  resolvers = {
    ...DEFAULT_RESOLVERS,
  } as RuntimeResolvers

  directives = {
    ...DEFAULT_DIRECTIVES,
  } as RuntimeDirectives

  private reduce(module: Runtime) {
    _.merge(this.inputs, module.inputs)
    _.merge(this.types, module.types)
    _.merge(this.resolvers, module.resolvers)
    _.merge(this.directives, module.directives)
  }

  add(module: Module) {
    const { schema, directives, resolvers } = module

    // resolvers and directives are straight passthrough
    this.reduce({ resolvers, directives })

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach(([name, def]) => {
        const { accessors, mutators, fields, relations } = def as Model

        // Generate the type definition
        this.reduce(generateModel(name, fields, relations))

        // Generate Queries and Mutations
        if (accessors) {
          if (accessors.find) {
            this.reduce(generateFind(name, accessors.find, fields))
          }

          if (accessors.list) {
            this.reduce(generateList(name, accessors.list, fields))
          }
        }

        if (mutators) {
          this.reduce(generateMutators(name, mutators, fields))
        }
      })
    }
  }

  generate() {
    const gqlSchema = []

    // add directives
    const gqlDirectives = Object.values(this.directives)
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

    if (this.types) {
      // generate types from mapped schema
      const typeSchema = Object.entries(this.types)
        .map(([label, def]) => {
          const fields = Object.entries(def).map(([fieldName, gqlDef]) => {
            return `${fieldName}: ${gqlDef}`
          })

          return `type ${label} { ${fields.join("\n")} }`
        })
        .join("\n")

      gqlSchema.push(typeSchema)
    }

    if (this.inputs) {
      const inputSchema = Object.entries(this.inputs)
        .map(([label, def]) => {
          const fields = Object.entries(def).map(([fieldName, gqlDef]) => {
            return `${fieldName}: ${gqlDef}`
          })

          return `input ${label} { ${fields.join("\n")} }`
        })
        .join("\n")

      gqlSchema.push(inputSchema)
    }

    const typeDefs = gqlSchema
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
      .join("\n\n")
    const resolvers = this.resolvers // already in the proper format
    const directiveResolvers = Object.entries(this.directives).reduce(
      (acc, dir) => {
        const [name, { handler }] = dir
        acc[name] = handler
        return acc
      },
      {}
    )

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      directiveResolvers,
    })

    return {
      typeDefs,
      schema,
    }
  }
}

// @todo - make this more specific
export type GQLTypeDefs = string
export type GQLSchema = any

export type GQLConfig = {
  typeDefs: GQLTypeDefs
  schema: GQLSchema
}

export type GeneratorOpts = {
  auth?: CallableModule
  // extend?: Module
} & Module

export function generate(opts: GeneratorOpts): GQLConfig {
  const { auth, ...config } = opts
  const generator = new Generator()

  if (auth) generator.add(auth(/* @todo should this take params? */))
  generator.add(config)

  return generator.generate()
}

const DEFAULT_INPUTS = {}

const DEFAULT_TYPES = {
  Query: {
    Ping: "String",
  },
  Mutation: {
    Ping: "String",
  },
}

const DEFAULT_RESOLVERS = {
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
}

const DEFAULT_DIRECTIVES = {}
