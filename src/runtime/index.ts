import _ from "lodash"
import { CallableModule, Module } from "~/types"
import { makeExecutableSchema } from "@graphql-tools/schema"
import {
  generateDirectiveResolvers,
  generateResolvers,
  generateTypeDefs,
} from "~/generator"

import { Reducer } from "~/reducer"
export class Runtime {
  reducer: Reducer

  constructor() {
    this.reducer = new Reducer()
  }

  module(module: Module) {
    this.reducer.module(module)
  }

  generate() {
    const reduced = this.reducer.toReducible()

    const typeDefs = generateTypeDefs(reduced)
    const resolvers = generateResolvers(reduced)
    const directiveResolvers = generateDirectiveResolvers(reduced)

    try {
      const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
        directiveResolvers,
      })

      return {
        typeDefs,
        schema,
      }
    } catch (err) {
      console.error("ERROR", err.message)
      console.log(typeDefs)

      // throw new Error("Unable to compile typeDefs")
      throw err
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
