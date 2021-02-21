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

type Fields = {
  [name: string]: Field
}

export type Field = {
  _gqlName: string
  _required: boolean
  _guard: string
}

// Configuration

export type Model = {
  fields: Fields
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

export type ReducedTypeField = {
  params?: ReducedTypeFieldParams
  returns: Field
}

export type ReducedTypeFields = {
  [name: string]: ReducedTypeField
}

export type ReducedType = {
  fields: ReducedTypeFields
}

export type ReducedTypes = {
  // Query: ReducedType
  // Mutation: ReducedType
  [name: string]: ReducedTypeFields
}
