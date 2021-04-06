// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

import { Field } from "./fields"
import { Model } from "./models"
import { Relation } from "./relations"
import { CypherInstance } from "./cypher/connection"

export { Field } from "./fields"
export { Model } from "./models"
export { Relation } from "./relations"

export type AuthModel = {} & Reducible
export type AuthStrategy = {} & Reducible

export type ModelOpts = {
  id?: boolean
  timestamps?: boolean
  input?: boolean
  output?: boolean
  guard?: string
  accessors?: Accessors | boolean
  mutators?: Mutators | boolean
}

export type ModelProps = {
  [propName: string]: Field | Relation
}

export type Fields = {
  [name: string]: Field
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
  reduce(reducer: Reducer, runtime: { cypher: CypherInstance }): void
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

// Server

export enum EVENTS {
  LOG = "LOG",
  ERROR = "ERROR",
  CYPHER = "CYPHER",
  GRAPHQL = "GQL",
  GRAPHQL_ERROR = "GQL-ERROR",
}
