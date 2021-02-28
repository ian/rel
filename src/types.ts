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

export type Directives = {
  [name: string]: {
    // typeDef: TypeDef
    typeDef: string
    resolver: (next, src, args, context) => void
  }
}

export type Endpoint = {
  type: string
  typeDef: TypeDef
  resolver: (next, src, args, context) => void
  // guard?: string
}

export type Endpoints = {
  [queryName: string]: Endpoint
}

export type Module = {
  schema?: Schema
  directives?: Directives
  endpoints?: Endpoints
}

export type CallableModule = (/* @todo - this should take some JIT params */) => Module

// Runtime Types
// These are used internally to the Runtime engine.

// export type ReducedTypeFieldParams = {
//   [name: string]: Field
// }

// // We let typedefs specify themselves as compartementalized params + guard + returns, or a straight string pipe through
// // Collisions are caught on the fieldName higher up
// export type ReducedTypeDef = {
//   params?: ReducedTypeFieldParams
//   guard?: string
//   returns: Field
// }
// // | string

// export type ReducedField = {
//   typeDef: ReducedTypeDef
//   resolver?: Resolver
// }

// export type ReducedType = {
//   [fieldName: string]: ReducedField
// }

// export type ReducedTypeQuery = {
//   [queryName: string]: ReducedField
// }

// export type ReducedTypeMutation = {
//   [mutationName: string]: ReducedField
// }

// export type ReducedTypes = {
//   Query?: ReducedTypeQuery
//   Mutation?: ReducedTypeMutation
//   [objectName: string]: ReducedType
// }

// export type ReducedInputs = {
//   [objectName: string]: ReducedType
// }

// export type ReducedResolvers = {
//   [name: string]: any
// }

// export type ReducedDirectives = {
//   [name: string]: {
//     typeDef: string
//     resolver: (next, src, args, context) => void
//   }
// }

export type ReducedProperty = {
  params?: Params
  guard?: string
  resolver?: Resolver
  returns: Field
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

export type Reducible = {
  inputs?: ReducedInputs
  types?: ReducedTypes
  endpoints?: Endpoints

  // @todo remove / change these
  directives?: Directives
  // resolvers?: ReducedResolvers
}

// Runtime - this is where the magic happens

export type Resolver = (...RuntimeArgs) => RuntimeObject

export type RuntimeAuthUser = {
  id: string
  name: string
}

export type RuntimeContext = {
  authUser?: RuntimeAuthUser
}

export type RuntimeObject = {
  [key: string]: any
}

export type RuntimeParams = {
  [key: string]: any
}

export type RuntimeArgs = [
  obj: RuntimeObject,
  params: RuntimeParams,
  context: RuntimeContext
]
