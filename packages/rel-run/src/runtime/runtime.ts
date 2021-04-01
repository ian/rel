import _ from "lodash"

import { Module, Reducible, RuntimeOpts, ENDPOINTS } from "@reldb/types"

import { generateResolvers, generateDirectiveResolvers } from "./resolvers"
import { generateTypeDefs } from "./typeDefs"

import Reducer from "./reducer"

export default class Runtime {
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
      throw err
    }
  }
}
