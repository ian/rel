import { SchemaComposer } from "graphql-compose"

import { Cypher } from "./cypher"
import { Field } from "./fields"
import { Relation } from "./relations"
import { GraphQLEndpoint, HTTPEndpoint } from "./endpoints"
import { Guard } from "./guards"
import { Model, Input, Output } from "./objects"

export type Composer = SchemaComposer

export {
  Field,
  Relation,
  GraphQLEndpoint,
  HTTPEndpoint,
  Guard,
  Model,
  Input,
  Output,
}

////////////////////////////////////////////////////
// Fields
////////////////////////////////////////////////////

export type Fields = {
  [name: string]: Field
}

////////////////////////////////////////////////////
// Relations
////////////////////////////////////////////////////

export enum RelationDirection {
  IN = "IN",
  OUT = "OUT",
  NONE = "NONE",
}

export type RelationEndpointOpts = {
  name?: string
  fromParam?: string
  toParam?: string
  guard?: Guard
}

////////////////////////////////////////////////////
// Objects
////////////////////////////////////////////////////

// I want Model to be additive + idempotent, use cases:
// Define a model: { Book: Rel.model({ title: Rel.string().required() }) }
// Should we extend like this? { Book: Rel.model({ published: Rel.int() }) }
//
// Should NOT be allowed: { Book: Rel.model().guard("admin") } # we don't want to allow changing of Model types, just extension

// enum ModelHook {
//   CREATE = "create",
//   UPDATE = "update",
//   DELETE = "delete",
// }

export type InputProperties = {
  [name: string]: Field
}

export type OutputProperties = {
  [name: string]: Field
}

export type ModelProperties = {
  [name: string]: Field | Relation
}

export type ModelOptions = {
  id?: boolean
  timestamps?: boolean
  input?: boolean
  output?: boolean
}

export type ModelEndpoints = {
  find?: ModelEndpointOpts | boolean
  list?: ModelEndpointOpts | boolean
  create?: ModelEndpointOpts | boolean
  update?: ModelEndpointOpts | boolean
  delete?: ModelEndpointOpts | boolean
}

export type ModelEndpointOpts = {
  guard?: Guard
}

export type Resolver = (...runtime: Runtime) => any
export type Middleware = (runtime: Runtime) => Promise<Runtime>
export type PropertyHandler = (runtime: Runtime, opts: FieldRuntimeOpts) => any
export type Plugin = (hydration: HydrationOpts) => void

export enum ServerEvents {
  LOG = "LOG",
  ERROR = "ERROR",
  CYPHER = "CYPHER",
  GRAPHQL = "GQL",
  GRAPHQL_ERROR = "GQL-ERROR",
}

////////////////////////////////////////////////////
// Endpoints
////////////////////////////////////////////////////

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum GraphQLOperation {
  QUERY = "QUERY",
  MUTATION = "MUTATION",
  // @todo
  // SUBSCRIPTION = "SUBSCRIPTION",
}

export enum EndpointType {
  GRAPHQL = "graphql",
  HTTP = "http",
}

export type Endpoint = GraphQLEndpoint | HTTPEndpoint
export type GraphQLEndpointOptions =
  | [
      name: string,
      params: { [name: string]: Field },
      returns: Field,
      resolver: Resolver
    ]
  | [name: string, returns: Field, resolver: Resolver]

export type HTTPEndpointOptions = [url: string, resolver: Resolver]
// @todo
// | [url: string, middleware, resolver: Resolver]

////////////////////////////////////////////////////
// Hydration API
//
// This is meant to be used by plugin developers.
//
// Hydration happens on initialization, allowing
// adding/modifying schema (not overwriting)
////////////////////////////////////////////////////

export type HydrationOpts = {
  hydrator: Hydrator
  composer: SchemaComposer
}

export type HydrationPropertyOpts = { obj: string; propName: string }

export interface HydrateableObject {
  hydrate: (hydration: HydrationOpts) => void
}

export interface HydrateableProperty {
  hydrate: (hydration: HydrationOpts, opts: HydrationPropertyOpts) => void
}

export interface Hydrator {
  schema: (...models: Model[]) => void
  auth: (...strategies: Plugin[]) => void
  plugins: (...plugins: Plugin[]) => void
  inputs: (...inputs: Input[]) => void
  outputs: (...outputs: Output[]) => void
  endpoints: (...endpoints: Endpoint[]) => void

  // IH: Unsure if we want to support this
  // directives: (...directives: Directive[]) => void
}

////////////////////////////////////////////////////
// Runtime Resolution
////////////////////////////////////////////////////

export type Runtime = [
  obj: RuntimeObject,
  params: RuntimeParams,
  context: RuntimeContext,
  info: object // @todo
]

export type RuntimeContext = {
  cypher: Cypher
}

export type RuntimeObject = any

export type RuntimeParams = {
  [key: string]: any
}

export type FieldRuntimeOpts = {
  modelName: string
  fieldName: string
}

////////////////////////////////////////////////////
// Cypher
////////////////////////////////////////////////////

export type Cypher1Response = {
  [key: string]: any
}

export type CypherResponse = Cypher1Response[]

export type CypherNodeOpts = {
  name: string
  params?: object
  label?: string
}

export type CypherRelOpts = {
  name: string
  direction?: RelationDirection
  label: string
  values?: object
}

export type CypherCreateOpts = {
  id?: boolean
  timestamps?: boolean
}

export type CypherUpdateOpts = {
  id?: boolean
  timestamps?: boolean
}

export type CypherListAssociationOpts = {
  where?: string
  order?: string
  orderRaw?: string
  singular?: boolean
}

export type CypherCreateAssociationOpts = {
  singular?: boolean
}

export type CypherDeleteAssociationOpts = {
  // @todo cascading?
}
