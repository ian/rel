import { formatSdl } from "format-graphql"
import _ from "lodash"
import { makeExecutableSchema } from "@graphql-tools/schema"

import { Model } from "./types"
import { generateFind, generateList } from "./accessors"
import { generateModel } from "./models"

// import { Directives, GeneratorModule, Resolvers, Schema } from "./types.ts.old"
import {
  Schema,
  Directives,
  Extensions,
  Resolvers,
  GeneratorModule,
  CallableGeneratorModule,
} from "./types"

class Generator {
  schema = {
    ...DEFAULT_SCHEMA,
  } as Schema

  resolvers = {
    ...DEFAULT_RESOLVERS,
  } as Resolvers

  directives = {
    ...DEFAULT_DIRECTIVES,
  } as Directives

  private reduce(module) {
    _.merge(this.schema, module.schema)
    _.merge(this.resolvers, module.resolvers)
    _.merge(this.directives, module.directives)
  }

  add(module: GeneratorModule) {
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
          if (mutators.create) {
            this.reduce(generateFind(name, accessors.find, fields))
          }

          if (mutators.update) {
            this.reduce(generateList(name, accessors.list, fields))
          }
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

    // generate types from mapped schema
    const typeSchema = Object.entries(this.schema)
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
        } catch (err) {
          console.error("Error during GQL compilation", typeStr, err)
        }
      })
      .join("\n")

    gqlSchema.push(typeSchema)

    const typeDefs = gqlSchema.join("\n\n")
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

export type GeneratorOpts = {
  auth?: CallableGeneratorModule
  // extend?: GeneratorModule
} & GeneratorModule

export type GeneratedRuntime = {
  typeDefs: string
  schema: any
}

export function generate(opts: GeneratorOpts): GeneratedRuntime {
  const { auth, ...config } = opts
  const generator = new Generator()

  if (auth) generator.add(auth(/* @todo should this take params? */))
  generator.add(config)

  return generator.generate()
}

const DEFAULT_SCHEMA = {
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
