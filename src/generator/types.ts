import { RuntimeParams, ResolvableObject } from "../resolvers"

export type SchemaObject = {
  [fieldName: string]: string
}

export type Schema = {
  [name: string]: SchemaObject
}

export type Directive = {
  schema: string
  handler: (next, src, args, context) => void
}

export type Directives =
  | {}
  | {
      [name: string]: Directive
    }

export type Resolver = (...RuntimeParams) => ResolvableObject
export type Resolvers =
  | {}
  | {
      [name: string]: Resolver
    }

export type GeneratorReply = {
  schema: Schema
  resolvers: Resolvers
  directives?: Directives
}
