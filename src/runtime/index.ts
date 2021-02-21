import { makeExecutableSchema } from "@graphql-tools/schema"
import { generateTypeDefs } from "../generator"
import { ReducedTypes, Module } from "~/types"

export class Runtime {
  types: ReducedTypes = {}

  // module(module: Module) {}

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
