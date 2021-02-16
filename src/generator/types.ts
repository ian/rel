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

export type Fields = {
  id?: boolean
  timestamps?: boolean
} & {
  [key: string]: ConfigField
}

type Mutator =
  | boolean
  | {
      guard?: string
    }

export type Mutators = {
  create?: Mutator
  update?: Mutator
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

export type Model = {
  fields: Fields
  relations: Relations
  accessors: ModelAccessors
  mutators: Mutators
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

export type GeneratorModule = {
  schema?: Schema
  resolvers?: Resolvers
  directives?: Directives
}

export type CallableGeneratorModule = () => GeneratorModule
