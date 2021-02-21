import _ from "lodash"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { generateTypeDefs } from "../generator"
import { Reducible, ReducedTypes, Model, Module } from "~/types"
import { modelToRuntime } from "./models"

export class Runtime {
  types: ReducedTypes = {}

  private reduce(module: Reducible) {
    // _.merge(this.inputs, module.inputs)
    _.merge(this.types, module.types)
    // _.merge(this.resolvers, module.resolvers)
    // _.merge(this.directives, module.directives)
  }

  module(module: Module) {
    console.log("module", JSON.stringify(module, null, 2))

    const { schema } = module

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach(([name, def]) => {
        const {
          // accessors, mutators,
          fields,
          relations,
        } = def as Model

        // Generate the type definition
        this.reduce(modelToRuntime(name, fields, relations))

        // Generate Queries and Mutations
        // if (accessors) {
        //   if (accessors.find) {
        //     this.reduce(generateFind(name, accessors.find, fields))
        //   }

        //   if (accessors.list) {
        //     this.reduce(generateList(name, accessors.list, fields))
        //   }
        // }

        // if (mutators) {
        //   this.reduce(generateMutators(name, mutators, fields))
        // }
      })
    }
  }

  generate() {
    const typeDefs = generateTypeDefs(this.types)
    const resolvers = {}
    const directiveResolvers = {}

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

export type RuntimeOpts = {
  // auth?: CallableModule
  // extend?: Module
} & Module

export function generate(opts: RuntimeOpts): GQLConfig {
  const { ...config } = opts
  const runtime = new Runtime()

  runtime.module(config)

  // if (auth) generator.add(auth(/* @todo should this take params? */))
  // generator.add(config)

  return runtime.generate()
}

// @todo - make this more specific
export type GQLTypeDefs = string
export type GQLSchema = any

export type GQLConfig = {
  typeDefs: GQLTypeDefs
  schema: GQLSchema
}
