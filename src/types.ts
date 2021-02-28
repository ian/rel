// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

// Global types used across multiple areas
// Rel supports inbound and outbound directions for relationships

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export enum ENDPOINTS {
  ACCESSOR = "ACCESSOR",
  MUTATOR = "MUTATOR",

  // CREATE = "CREATE",
  // READ = "READ",
  // UPDATE = "UPDATE",
  // DELETE = "DELETE",
}

export type FieldToGQLOpts = {
  guards?: boolean
}

export type Field = {
  toGQL(opts?: FieldToGQLOpts): string
}

export type Fields = {
  [name: string]: Field
}

export type Params = {
  [name: string]: Field
}

export type TypeDef = {
  params?: Params
  guard?: string
  returns: Field
}

// Configuration

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

export type FindAccessor = Accessor & {
  findBy?: Params
}

export type ListAccessor = Accessor & {
  listBy?: Params
}

export type Accessor = {
  // params?: Fields
  guard?: string
  after?: (obj: object) => Promise<void>
}

export type Accessors = {
  find?: FindAccessor | boolean
  list?: ListAccessor | boolean
}

export type CreateMutator = Mutator & {}
export type UpdateMutator = Mutator & {}
export type DeleteMutator = Mutator & {}

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

export type Mutators = {
  create?: CreateMutator | boolean
  update?: UpdateMutator | boolean
  delete?: DeleteMutator | boolean
}

export type Model = {
  id?: boolean
  timestamps?: boolean
  input?: boolean
  fields: Fields
  relations?: Relations
  accessors?: Accessors
  mutators?: Mutators
}

export type Schema = {
  [name: string]: Model
}

export type ResolverArgs = {
  src: string
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

export type Endpoint = {
  type: string
  typeDef: TypeDef
  resolver: Resolver
}

export type Endpoints = {
  [queryName: string]: Endpoint
}

export type Module = {
  schema?: Schema
  guards?: Guards
  endpoints?: Endpoints
}

export type CallableModule = (/* @todo - this should take some JIT params */) => Module

// Reducer

export type ReducedProperty = {
  typeDef: TypeDef
  resolver?: Resolver
}

export type ReducedInput = {
  [propName: string]: ReducedProperty
}

export type ReducedInputs = {
  [inputName: string]: ReducedInput
}

export type ReducedType = {
  [propName: string]: ReducedProperty
}

export type ReducedTypes = {
  [inputName: string]: ReducedType
}

export type ReducedGuards = Guards

export type Reducible = {
  inputs?: ReducedInputs
  types?: ReducedTypes
  endpoints?: Endpoints
  guards?: ReducedGuards
}

// Cypher

export type Cypher1Response = {
  [key: string]: any
}

export type CypherResponse = Cypher1Response[]
