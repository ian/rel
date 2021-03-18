import _ from "lodash"
// import { GraphQLSchema } from "graphql"
import { IResolvers } from "apollo-server-fastify"
import { Module, Reducible, ENDPOINTS } from "../types"
import {
  generateDirectiveResolvers,
  generateResolvers,
  generateTypeDefs,
} from "../generator"

import { Reducer } from "../reducer"

export class Runtime {
  reducer: Reducer

  constructor() {
    this.reducer = new Reducer()
  }

  auth(auth: Reducible) {
    this.reducer.reduce(auth)
  }

  module(module: Module) {
    this.reducer.module(module)
  }

  generate(): GQLConfig {
    const reduced = this.reducer.toReducible()

    const typeDefs = generateTypeDefs(reduced)
    const resolvers = generateResolvers(reduced)
    const directiveResolvers = generateDirectiveResolvers(reduced)

    try {
      return {
        typeDefs,
        resolvers,
        directiveResolvers,
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
  auth?: Module
} & Module

export function generate(opts: RuntimeOpts): GQLConfig {
  const { auth, ...config } = opts
  const runtime = new Runtime()

  if (auth) runtime.auth(auth)

  runtime.module(config)

  return runtime.generate()
}

// @todo - make this more specific
export type GQLTypeDefs = string
export type GQLSchema = any
export type GQLConfig = {
  typeDefs: GQLTypeDefs
  // schema: GQLSchema
  resolvers: IResolvers
  directiveResolvers: any
}
