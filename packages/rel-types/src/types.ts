// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

// Global types used across multiple areas
// Rel supports inbound and outbound directions for relationships

export interface Model {
  fields(fields: Fields): Model
  relations(relations: Relations): Model
  accessors(accessors?: Accessors | boolean): Model
  mutators(mutators?: Mutators | boolean): Model
  guard(scope: string): Model

  reduce(reducer: Reducer, opts: { modelName: string }): void
}

export type Fields = {
  [name: string]: Field
}

export type Field = {
  label: string
  guard: (string) => Field
  default: (valueOrFn: DefaultValue | CallableDefaultValue) => Field
  resolver?: Resolver

  // @todo - rely on FieldImpl for these
  _label: string
  _required?: boolean
  _guard?: string
  _default?: (runtime) => Promise<any>
  _resolver?: (runtime) => Promise<any>
}

export type Rel = {
  from(from: string): Rel
  to(to: string): Rel
  direction(direction: Direction): Rel
  singular(boolean?): Rel
  order(string): Rel
  guard(scope: string): Rel

  reduce(reducer: Reducer, opts: { modelName: string; fieldName: string }): void
}

export type Relations = {
  [key: string]: Rel
}

export enum Direction {
  IN = "IN",
  OUT = "OUT",
  NONE = "NONE",
}

export type DefaultValue = string | number
export type CallableDefaultValue = (runtime: ResolverArgs) => DefaultValue

export type Params = {
  [name: string]: Field
}

export type Input = {
  [propName: string]: Field
}

export type Inputs = {
  [inputName: string]: Input
}

export type Output = {
  [propName: string]: Field
}

export type Outputs = {
  [inputName: string]: Output
}

export type RelationFrom = {
  label: string
  params?: (any) => object
}

export type RelationTo = {
  label: string
  params?: (any) => object
}

// Accessors

export type Accessors = {
  find?: FindAccessor | boolean
  list?: ListAccessor | boolean
}

export type FindAccessor = Accessor & {
  findBy?: Params
}

export type ListAccessor = Accessor & {
  listBy?: Params
}

export type Accessor = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

// Mutators

export type Mutators = {
  create?: CreateMutator | boolean
  update?: UpdateMutator | boolean
  delete?: DeleteMutator | boolean
}

export type CreateMutator = Mutator & {
  /* @todo opts */
}
export type UpdateMutator = Mutator & {
  /* @todo opts */
}
export type DeleteMutator = Mutator & {
  /* @todo opts */
}

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

// Schema

export type Schema = {
  [name: string]: Model
}

export type ResolverArgs = {
  // src: string
  args: object
  context: object
  cypher: (c: string) => Promise<CypherResponse>
  cypher1: (c: string) => Promise<Cypher1Response>
}

export type Resolver = (ResolverArgs?) => RuntimeObject
export type RuntimeObject = any

export type Guards = {
  [name: string]: {
    typeDef?: string
    resolver: (ResolverArgs?) => Promise<any>
  }
}

// Endpoints

export enum ENDPOINTS {
  ACCESSOR = "ACCESSOR",
  MUTATOR = "MUTATOR",
}

export type Endpoint = {
  target: ENDPOINTS
  params?: Params
  guard?: string
  returns: Field
  resolver: Resolver
}

export type Endpoints = {
  [queryName: string]: Endpoint
}

// Modules

export type Module = {
  schema?: Schema
  plugins?: Plugin[]
} & Reducible

export type Plugin = Module
export type CallableModule = (/* @todo - this should take some JIT params */) => Module

// Reduction

export type Reducible = {
  inputs?: Inputs
  outputs?: Outputs
  endpoints?: Endpoints
  guards?: Guards
}

export type Reducer = (Reducible) => void

// Cypher

export type Cypher1Response = {
  [key: string]: any
}

export type CypherResponse = Cypher1Response[]

// Cypher Types

export type Geo = {
  lat: number
  lng: number
}

// Runtime

export type RuntimeOpts = {
  auth?: Module
} & Module

// Server

export enum EVENTS {
  LOG = "LOG",
  ERROR = "ERROR",
  CYPHER = "CYPHER",
  GRAPHQL = "GQL",
  GRAPHQL_ERROR = "GQL-ERROR",
}
