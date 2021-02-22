// Following a global types definition file like how the TypeScript team uses: https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts

import { string } from "yup/lib/locale"
import { phoneNumber } from "./fields"

// Global types used across multiple areas

// Rel supports inbound and outbound directions for relationships

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export // Fields always look like:
// {
//   name: string().required(),
//   description: string()
//   phone: phoneNumber()
// }

type MetaFields = {
  id?: boolean
  timestamps?: boolean
}

export type Fields = {
  [name: string]: Field
}

export type ToGQLOpts = {
  guards?: boolean
}

export type Field = {
  // _gqlName: string
  // _required: boolean
  // _guard: string
  toGQL(opts: ToGQLOpts): () => string
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
  findBy?: Fields
}

export type ListAccessor = Accessor & {
  listBy?: Fields
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

export type Mutator = {
  guard?: string
  after?: (obj: object) => Promise<void>
}

// export type Mutators = {
//   create?: Mutator | boolean
//   update?: Mutator | boolean
//   delete?: Mutator | boolean
// }

export type Model = {
  fields: MetaFields & Fields
  relations?: Relations
  accessors?: Accessors
  // mutators?: Mutators
}

export type Schema = {
  [name: string]: Model
}

export type Module = {
  schema: Schema
}

// Runtime Types
// These are used internally to the Runtime engine.

// export type ReducedField = {
//   name: string
//   returns: Field
//   // params: {
//   //   [name: string]: Field
//   // }
// }

// export type ReducedType = {
//   [fieldName: string]: ReducedField
// }

export type ReducedTypeFieldParams = {
  [name: string]: Field
}

export type ReducedField = {
  params?: ReducedTypeFieldParams
  guard?: string
  returns: Field // | string
  resolver?: Resolver
}

export type ReducedType = {
  [fieldName: string]: ReducedField
}

// export type ReducedType = {
//   fields: ReducedFields
// }

export type ReducedTypes = {
  Query?: ReducedType
  Mutation?: ReducedType
  [objectName: string]: ReducedType
}

export type ReducedInputs = {
  [objectName: string]: ReducedType
}

export type ReducedResolvers = {
  [name: string]: any
}

export type Reducible = {
  inputs?: ReducedInputs
  types?: ReducedTypes
  resolvers?: ReducedResolvers
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
