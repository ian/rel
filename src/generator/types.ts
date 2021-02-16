import { ResolvableObject } from "../resolvers/types"

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export type ConfigField = {
  _gqlName: string
  _required: boolean
  _guard: string
}

export type MetaFields = {
  id?: boolean
  timestamps?: boolean
}

export type Fields = MetaFields & {
  [key: string]: ConfigField
}

export type Model = {
  fields: Fields
  relations: Relations
  accessors: ModelAccessors
  mutators: Mutators
}

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

export type Mutators = {
  create?: Mutator | boolean
  update?: Mutator | boolean
  delete?: Mutator | boolean
}

export type RelationFrom = {
  label: string
  params?: (any) => object
}

export type RelationTo = {
  label: string
  params?: (any) => object
}

export type Rel = {
  label: string
  direction?: Direction
}

export type Relation = {
  from: RelationFrom
  to: RelationTo
  rel: Rel
  direction?: Direction
  singular?: boolean
  order?: string
}

export type Relations = {
  [key: string]: Relation
}

export type ModelAccessors = {
  find?: boolean
  list?: boolean
}

export type Schema =
  | {}
  | {
      [name: string]: Model
    }

export type Directives = {
  [name: string]: {
    schema: string
    handler: (next, src, args, context) => void
  }
}

export type Extensions = {
  [name: string]: {
    schema: string
    handler: (obj, params, context) => Promise<ResolvableObject>
  }
}

export type Resolver = (...RuntimeParams) => ResolvableObject
export type Resolvers =
  | {}
  | {
      [name: string]: Resolver
    }

// Output from modules / generators

type GeneratedTypes = {
  [name: string]: object
}

type GeneratedInputs = {
  [name: string]: object
}

export type GeneratedSchema = {
  types?: GeneratedTypes
  inputs?: GeneratedInputs
}

export type GeneratedResolvers = {}

export type GeneratedDirectives = {
  [name: string]: {
    schema: string
    handler: (next, src, args, context) => void
  }
}

export type Module = {
  schema?: GeneratedSchema
  resolvers?: GeneratedResolvers
  directives?: GeneratedDirectives
}

export type CallableModule = () => Module
