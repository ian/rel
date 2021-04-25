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

export enum RelationDirection {
  IN = "IN",
  OUT = "OUT",
  NONE = "NONE",
}

////////////////////////////////////////////////////
// The main consumable Rel object
////////////////////////////////////////////////////
export interface Rel {
  model(name: string, props: ModelProperties, opts?: ModelOptions): Model

  input(name: string, props: InputProperties): Input
  output(name: string, props: OutputProperties): Output

  string(): Field
  boolean(): Field
  uuid(): Field
  int(): Field
  float(): Field
  dateTime(): Field
  geo(): Field
  phoneNumber(): Field
  string(): Field
  slug(opts: { from: string }): Field

  array(contains: Field): Field
  ref(model: string): Field

  relation(label: string): Relation

  // GraphQL
  query(...opts: GraphQLEndpointOptions): GraphQLEndpoint
  mutation(...opts: GraphQLEndpointOptions): GraphQLEndpoint

  // HTTP
  get(...opts: HTTPEndpointOptions): HTTPEndpoint
  post(...opts: HTTPEndpointOptions): HTTPEndpoint
  put(...opts: HTTPEndpointOptions): HTTPEndpoint
  delete(...opts: HTTPEndpointOptions): HTTPEndpoint

  guard(name: string): Guard
}

////////////////////////////////////////////////////
// Consumer API
//
// We want to expose a toolset of useful ways to describe your system in a high-level
////////////////////////////////////////////////////

export interface Field extends HydrateableProperty {
  // constructor(label, ...rest: [rel: object, to: string] | [to: string])
  label: string

  // Chainable
  guard: (guard: Guard) => Field
  required: (required?: boolean) => Field
  default: (handler: PropertyHandler) => Field
  handler: (handler: Handler) => Field
  reduce: () => ReducibleProperty
  defaulted: (runtime: Runtime, opts: FieldRuntimeOpts) => any
}

export type Fields = {
  [fieldName: string]: Field
}

export interface Relation extends HydrateableProperty {
  // constructor(label, ...rest: [rel: object, to: string] | [to: string])
  // new (label: string, opts?: RelationOptions): Relation

  // Chainable
  from: (from: string) => Relation
  to: (to: string) => Relation
  guard: (guard: Guard) => Relation
  endpoints: (endpoints: boolean | { add: string; remove: string }) => Relation
  singular: (singular?: boolean) => Relation
  inbound: (inbound?: boolean) => Relation
  direction: (direction: RelationDirection) => Relation
  handler: (handler: Handler) => Relation

  // reduce: () => ReducibleProperty
}

// I want Model to be additive + idempotent, use cases:
// Define a model: { Book: Rel.model({ title: Rel.string().required() }) }
// Should we extend like this? { Book: Rel.model({ published: Rel.int() }) }
//
// Should NOT be allowed: { Book: Rel.model().guard("admin") } # we don't want to allow changing of Model types, just extension

enum ModelHook {
  CREATE = "create",
  UPDATE = "create",
  DELETE = "create",
}
export interface Model extends HydrateableObject {
  name: string
  props: ModelProperties

  guard(guard: Guard): Model
  endpoints(endpoints: boolean | ModelEndpoints): Model

  before(hook: ModelHook, handler: Handler): Model
  after(hook: ModelHook, handler: Handler): Model
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

// export type Schema = {
//   [modelName: string]: Model
// }

export type Handler = (runtime: Runtime) => any
export type PropertyHandler = (runtime: Runtime, opts: FieldRuntimeOpts) => any
export type Plugin = (hydrator: Hydrator) => void

export type Server = {
  models(...models: Model[])
  endpoints(...endpoints: Endpoint[])
  plugin(plugin: Plugin)
}

export enum ServerEvents {
  LOG = "LOG",
  ERROR = "ERROR",
  CYPHER = "CYPHER",
  GRAPHQL = "GQL",
  GRAPHQL_ERROR = "GQL-ERROR",
}

////////////////////////////////////////////////////
// Hydration API
//
// This is meant to be used by plugin developers.
//
// Hydration happens on initialization, allowing
// adding/modifying schema (not overwriting)
////////////////////////////////////////////////////

export interface HydrateableObject {
  hydrate: (hydrator: Hydrator) => void
}

export interface HydrateableProperty {
  hydrate: (
    hydrator: Hydrator,
    { obj: HydrateableObject, propName: string }
  ) => void
}

export interface Hydrator {
  schema: (...models: Model[]) => void
  plugins: (...plugins: Plugin[]) => void
  inputs: (...inputs: Input[]) => void
  outputs: (...outputs: Output[]) => void
  guards: (...guards: Guard[]) => void
  endpoints: (...endpoints: Endpoint[]) => void
}

export type Hydrated = {
  inputs: { [name: string]: Input }
  outputs?: { [name: string]: Output }
  guards?: { [name: string]: Guard }
  graphQLEndpoints?: GraphQLEndpoint[]
  httpEndpoints?: HTTPEndpoint[]
}

export type InputProperties = {
  [name: string]: Field
}

export interface Input extends HydrateableObject {
  name: string
  props: InputProperties

  // Chainable
  guard: (guard: Guard) => Input
  // prepare: (prepare: Handler) => Input

  reduce: () => ReducibleInput
  // defaults: (runtime: Runtime) => any
}

export type OutputProperties = {
  [name: string]: Field
}
export interface Output extends HydrateableObject {
  name: string
  props: OutputProperties

  // Chainable
  guard: (guard: Guard) => Output
  handler: (handler: Handler) => Output
  reduce: () => ReducibleOutput
}
export interface Guard {
  name: string
  handler(handler: Handler): Guard
  reduce: () => ReducibleDirective
}

export enum EndpointType {
  GRAPHQL = "graphql",
  HTTP = "http",
}

export type Endpoint = GraphQLEndpoint | HTTPEndpoint
export interface GraphQLEndpoint {
  type: EndpointType
  reduce(): ReducedGraphQLEndpoint
  // Chainable
  guard: (guard: Guard) => GraphQLEndpoint
  handler(handler: Handler): GraphQLEndpoint
}

export type GraphQLEndpointOptions =
  | [
      name: string,
      params: { [name: string]: Field },
      returns: Field,
      handler: Handler
    ]
  | [name: string, returns: Field, handler: Handler]

export interface HTTPEndpoint {
  type: EndpointType
  reduce(): ReducedHTTPEndpoint
  // Chainable
  handler(handler: Handler): HTTPEndpoint
}

export type HTTPEndpointOptions = [url: string, handler: Handler]
// @todo
// | [url: string, middleware, handler: Handler]

////////////////////////////////////////////////////
// Reduction API
//
// Reduction happens during runtime handoff, it will
// build the GQL + HTTP dependency tree for server run
////////////////////////////////////////////////////

export type Reducer = {
  inputs: (inputs: ReducibleInputs) => void
  outputs: (outputs: ReducibleOutputs) => void
  directives: (directives: ReducibleDirectives) => void
  graphqlEndpoints: (gql: ReducedGraphQLEndpoint[]) => void
  httpEndpoints: (http: ReducedHTTPEndpoint[]) => void
}

export type ReducibleProperty = {
  returns: string
  params?: ReducibleInputParams
  guard?: ReducibleDirective
  required?: boolean
  handler?: PropertyHandler
}

export type ReducibleInputParams = {
  [paramName: string]: ReducibleProperty
}

export type ReducibleInput = ReducibleProperty & {
  properties: {
    [propertyName: string]: ReducibleProperty
  }
  prepare?: (runtime: Runtime) => object
}

export type ReducibleInputs = {
  [inputName: string]: ReducibleInput
}

export type ReducibleOutputParams = {
  [paramName: string]: ReducibleProperty
}

export type ReducibleOutput = ReducibleProperty & {
  properties: {
    [propertyName: string]: ReducibleProperty
  }
  handler?: (runtime: Runtime) => any
}

export type ReducibleOutputs = {
  [outputName: string]: ReducibleOutput
}

export type ReducibleDirective = {
  name: string
  typeDef?: string
  resolver: Handler
}

export type ReducibleDirectives = {
  [guardName: string]: ReducibleDirective
}

export type ReducedGraphQLEndpoint = ReducibleProperty & {
  operation: GraphQLOperation
  name: string
  handler: (runtime: Runtime) => any
}

// export type ReducedGraphQLEndpoints = {
//   [name: string]: ReducedGraphQLEndpoint
// }

export type ReducedHTTPEndpoint = {
  method: HTTPMethod
  handler: (runtime: Runtime) => any

  // @todo - should we support guards/strong typing on HTTP?
  // guard?: string
  // params?: ReducibleInputParams
  // returns: string
}

// export type ReducedHTTPEndpoints = {
//   [name: string]: ReducedHTTPEndpoint
// }

export type Reduced = {
  inputs?: { [name: string]: ReducibleInput }
  outputs?: { [name: string]: ReducibleOutput }
  directives?: { [name: string]: ReducibleDirective }
  graphqlEndpoints?: ReducedGraphQLEndpoint[]
  httpEndpoints?: ReducedHTTPEndpoint[]
}

export type RuntimeContext = {
  [contextParam: string]: any
}

export type RuntimeObject = any

export type RuntimeParams = {
  [key: string]: any
}

export type Runtime = {
  obj: RuntimeObject
  params: RuntimeParams
  context: RuntimeContext
  cypher: Cypher
}

export type FieldRuntimeOpts = {
  modelName: string
  fieldName: string
}

////////////////////////////////////////////////////
// Cypher API
//
// Work directly with the Database
////////////////////////////////////////////////////

export interface Cypher {
  raw(cypher: string): Promise<object>
  exec(cypher: string): Promise<CypherResponse>
  exec1(cypher: string): Promise<Cypher1Response>

  find: (label: string, params: object) => Promise<Cypher1Response>

  list: (label: string, opts?: object) => Promise<CypherResponse>

  create: (
    label: string,
    params: object,
    opts?: CypherCreateOpts
  ) => Promise<Cypher1Response>

  update: (
    label: string,
    id: string,
    params: object,
    opts?: CypherUpdateOpts
  ) => Promise<Cypher1Response>

  delete: (label: string, id: string) => Promise<Cypher1Response>

  listRelation: (
    from: CypherNodeOpts,
    to: CypherNodeOpts,
    rel: CypherRelOpts,
    opts?: CypherListAssociationOpts
  ) => Promise<CypherResponse>

  clearRelation(from: CypherNodeOpts, rel: CypherRelOpts)
  createRelation(
    from: CypherNodeOpts,
    to: CypherNodeOpts,
    rel: CypherRelOpts,
    opts?: CypherCreateAssociationOpts
  ): Promise<Cypher1Response>
  deleteRelation(
    from: CypherNodeOpts,
    to: CypherNodeOpts,
    rel: CypherRelOpts
    // opts?: CypherDeleteAssociationOpts
  ): Promise<Cypher1Response>
}

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
