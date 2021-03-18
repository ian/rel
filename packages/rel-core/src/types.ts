// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

// Global types used across multiple areas
// Rel supports inbound and outbound directions for relationships

export type Field = {
  _default?: (label, fieldName, values) => Promise<any>
  _resolver?: (object) => Promise<any>
  toGQL(): string
}

export type Property = {
  params?: Params
  guard?: string
  returns: Field
  resolver?: Resolver
}

export type Fields = {
  [name: string]: Field
}

export type Params = {
  [name: string]: Field
}

export type Input = {
  [propName: string]: Property
}

export type Inputs = {
  [inputName: string]: Input
}

export type Output = {
  [propName: string]: Property
}

export type Outputs = {
  [inputName: string]: Output
}

//////////////////////
// Relations
//////////////////////

export type Rel = {
  from: (Field) => Rel
  to: (Field) => Rel
  direction: (Direction) => Rel
  singular: (boolean) => Rel
  order: (string) => Rel
  guard: (string) => Rel

  toResolved(): ResolvedRel
}

export type ResolvedRel = {
  from: {
    label: string
  } | null
  to: {
    label: string
  }
  rel: {
    label: string
    direction: Direction
  }
  singular: boolean
  order: string
  guard?: string
}

export type RelationFrom = {
  label: string
  params?: (any) => object
}

export type RelationTo = {
  label: string
  params?: (any) => object
}

export type Relations = {
  [key: string]: Rel
}

export enum Direction {
  IN = "IN",
  OUT = "OUT",
  NONE = "NONE",
}

//////////////////////
// Accessors
//////////////////////

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

//////////////////////
// Mutators
//////////////////////

export type Mutators = {
  create?: CreateMutator | boolean
  update?: UpdateMutator | boolean
  delete?: DeleteMutator | boolean
}

export type CreateMutator = Mutator & {}
export type UpdateMutator = Mutator & {}
export type DeleteMutator = Mutator & {}

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

//////////////////////
// Schema
//////////////////////

export type Schema = {
  [name: string]: Model
}

export type Model = {
  id?: boolean
  timestamps?: boolean

  // should these even exist?
  input?: boolean
  output?: boolean

  fields?: Fields
  relations?: Relations
  accessors?: Accessors
  mutators?: Mutators
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

//////////////////////
// Endpoints
//////////////////////

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

//////////////////////
// Modules
//////////////////////

export type Module = {
  schema?: Schema
  inputs?: Inputs
  outputs?: Outputs
  guards?: Guards
  endpoints?: Endpoints
}

export type CallableModule = (/* @todo - this should take some JIT params */) => Module

//////////////////////
// Reducer
//////////////////////

export type Reducible = {
  inputs?: Inputs
  outputs?: Outputs
  endpoints?: Endpoints
  guards?: Guards
}

// Cypher

export type Cypher1Response = {
  [key: string]: any
}

export type CypherResponse = Cypher1Response[]
