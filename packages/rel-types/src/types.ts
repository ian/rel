// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

export type AuthModel = {} & Reducible
export type AuthStrategy = {} & Reducible

export interface Model {
  fields(fields: Fields): Model
  relations(relations: Relations): Model
  accessors(accessors?: Accessors | boolean): Model
  mutators(mutators?: Mutators | boolean): Model
  guard(scope: string): Model

  reduce(reducer: Reducer, opts: { modelName: string }): void
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

export type Fields = {
  [name: string]: Field
}

export type Relation = {
  from(from: string): Relation
  to(to: string): Relation
  inbound(): Relation
  direction(direction: Direction): Relation
  singular(boolean?): Relation
  order(string): Relation
  guard(scope: string): Relation

  reduce(reducer: Reducer, opts: { modelName: string; fieldName: string }): void
}

export type Relations = {
  [key: string]: Relation
}

export enum Direction {
  IN = "IN",
  OUT = "OUT",
  NONE = "NONE",
}

export type DefaultValue = string | number
export type CallableDefaultValue = (runtime: ResolverArgs) => DefaultValue

// Schema

export type Schema = {
  [name: string]: Model
}

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

export type ResolverArgs = {
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

// Plugins

export type Plugin = {
  schema?: Schema
  plugins?: Plugin[]
} & Reduced

export type CallablePlugin = (/* @todo - this should take some JIT params */) => Plugin

// Reduction

export type Reducible = {
  reduce(reducer: Reducer): void
}

export type Reduced = {
  // server?: Server
  schema?: Schema
  inputs?: Inputs
  outputs?: Outputs
  endpoints?: Endpoints
  guards?: Guards
}

export type Reducer = (Reduced) => void

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

// Server

export enum EVENTS {
  LOG = "LOG",
  ERROR = "ERROR",
  CYPHER = "CYPHER",
  GRAPHQL = "GQL",
  GRAPHQL_ERROR = "GQL-ERROR",
}
