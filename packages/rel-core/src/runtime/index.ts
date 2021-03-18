import _ from "lodash"
// import { Config } from "apollo-server-core"
import { Module, Reducible } from "../types"
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

  generate() {
    const reduced = this.reducer.toReducible()

    const typeDefs = generateTypeDefs(reduced)
    const resolvers = generateResolvers(reduced)
    const directives = generateDirectiveResolvers(reduced)

    try {
      return {
        typeDefs,
        resolvers,
        directives,
      }
    } catch (err) {
      // console.error("ERROR", err.message)
      throw err
    }
  }
}

export type RuntimeOpts = {
  auth?: Module
} & Module

export function generate(opts: RuntimeOpts) {
  const { auth, ...config } = opts
  const runtime = new Runtime()

  if (auth) runtime.auth(auth)

  runtime.module(config)

  return runtime.generate()
}
