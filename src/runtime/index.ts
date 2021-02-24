import _ from "lodash"
import { CallableModule, Module } from "~/types"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { Reducer } from "~/reducer"
import { generateTypeDefs } from "~/generator"
import { modelToRuntime } from "./models"

export class Runtime {
  reducer: Reducer

  constructor() {
    this.reducer = new Reducer()
  }

  module(module: Module) {
    // console.log("module", JSON.stringify(module, null, 2))

    const { schema } = module

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach((entry) => {
        const [name, model] = entry
        this.reducer.reduce(modelToRuntime(name, model))
      })
    }
  }

  generate() {
    const reduced = this.reducer.toReducible()
    const typeDefs = generateTypeDefs(reduced)
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
  auth?: CallableModule
  // extend?: Module
} & Module

export function generate(opts: RuntimeOpts): GQLConfig {
  const { auth, ...config } = opts
  const runtime = new Runtime()

  if (auth) runtime.module(auth(/* @todo should this take params? */))

  runtime.module(config)

  return runtime.generate()
}

// @todo - make this more specific
export type GQLTypeDefs = string
export type GQLSchema = any

export type GQLConfig = {
  typeDefs: GQLTypeDefs
  schema: GQLSchema
}
