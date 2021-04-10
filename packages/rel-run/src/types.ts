// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

import { Field } from "./fields"
import { Model } from "./models"
import { Relation } from "./relations"
import { Hydrator } from "./server"
import { CypherInstance } from "./cypher/connection"
import { GraphQLEndpoint, HTTPEndpoint } from "./endpoints"

export { Field } from "./fields"
export { Model } from "./models"
export { Relation } from "./relations"
export { GraphQLEndpoint, HTTPEndpoint } from "./endpoints"

export type Endpoint = GraphQLEndpoint | HTTPEndpoint

export type Plugin = (hydrator: Hydrator) => void

export interface Hydratable {
  hydrate(hydrator: Hydrator, runtime: { cypher: CypherInstance }): void
}

export type Reducer = {
  reduce(reduced: Reducible): void
}

export type Auth = { model: AuthModel; strategies: AuthStrategy[] }
export type AuthModel = {} & Hydratable
export type AuthStrategy = {} & Hydratable

export type ModelOpts = {
  id?: boolean
  timestamps?: boolean
  input?: boolean
  output?: boolean
  guard?: string
  endpoints?: ModelEndpoints
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

export type ModelEndpoints = {
  find?: ModelEndpointsFindOpts | boolean
  list?: ModelEndpointsListOpts | boolean
  create?: ModelEndpointsCreateOpts | boolean
  update?: ModelEndpointsUpdateOpts | boolean
  delete?: ModelEndpointsDeleteOpts | boolean
}

export type ModelEndpointOpts = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

export type ModelEndpointsFindOpts = ModelEndpointOpts & {
  findBy?: Params
}

export type ModelEndpointsListOpts = ModelEndpointOpts & {
  listBy?: Params
}

export type ModelEndpointsCreateOpts = ModelEndpointOpts & {
  /* @todo opts */
}
export type ModelEndpointsUpdateOpts = ModelEndpointOpts & {
  /* @todo opts */
}
export type ModelEndpointsDeleteOpts = ModelEndpointOpts & {
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

// @todo - migrate this to callable reducible
export type Guard = string

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum GraphQLOperationType {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
  // @todo
  // SUBSCRIPTION = "SUBSCRIPTION",
}

export type ReducedInput = {
  [propName: string]: Field
}

export type ReducedOutput = {
  [propName: string]: Field
}

export type ReducedGuard = {
  typeDef?: string
  resolver: (ResolverArgs?) => Promise<any>
}

export type ReducedGQLEndpoint = {
  type: GraphQLOperationType
  label: string
  params?: Params
  guard?: string
  returns: Field
  resolver: Resolver
}

export type ReducedHTTPEndpoint = {
  returns: Field
  method: HTTPMethods
  url: string
  resolver: Resolver
}

export type ReducerConsumable = {
  inputs?: { [name: string]: ReducedInput }
  outputs?: { [name: string]: ReducedInput }
  graphQLEndpoints?: ReducedGQLEndpoint[]
  httpEndpoints?: ReducedHTTPEndpoint[]
  guards?: ReducedGuard[]
}

export type Reducible = {
  inputs?: { [name: string]: ReducedInput }
  outputs?: { [name: string]: ReducedOutput }
  // endpoints?: (ReducedGQLEndpoint | ReducedHTTPEndpoint)[]
  graphQLEndpoints?: ReducedGQLEndpoint | ReducedGQLEndpoint[]
  httpEndpoints?: ReducedHTTPEndpoint | ReducedHTTPEndpoint[]
  guards?: { [name: string]: ReducedGuard }
}

// I realize these are almost identical but one is inbound the other is reduced outbound

export type Reduced = {
  inputs?: { [name: string]: ReducedInput }
  outputs?: { [name: string]: ReducedOutput }
  graphQLEndpoints?: ReducedGQLEndpoint[]
  httpEndpoints?: ReducedHTTPEndpoint[]
  // endpoints?: ReducedEndpoint[]
  guards?: { [name: string]: ReducedGuard }
}

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
