import { ResolvableObject } from "../resolvers/types"

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export type ConfigField = {
  _gqlName: string
  _required: boolean
  _guard: string
}

export type ConfigFields = {
  id?: boolean
  timestamps?: boolean
} & {
  [key: string]: ConfigField
}

export type ConfigFrom = {
  label: string
  params?: (any) => object
}

export type ConfigTo = {
  label: string
  params?: (any) => object
}

export type ConfigRel = {
  label: string
  direction?: Direction
}

export type ConfigRelation = {
  from: ConfigFrom
  to: ConfigTo
  rel: ConfigRel
  direction?: Direction
  singular?: boolean
  order?: string
}

export type ConfigRelations = {
  [key: string]: ConfigRelation
}

export type ConfigAccessors = {
  find?: boolean
  list?: boolean
}

export type ConfigModel = {
  accessors: ConfigAccessors
  fields: ConfigFields
  relations: ConfigRelations
}

export type ConfigModels =
  | {}
  | {
      [name: string]: ConfigModel
    }

export type ConfigDirectives = {
  [name: string]: {
    schema: string
    handler: (next, src, args, context) => void
  }
}

export type ConfigExtension = {
  [name: string]: {
    schema: string
    handler: (obj, params, context) => Promise<ResolvableObject>
  }
}

export type Config = {
  models?: ConfigModels
  directives?: ConfigDirectives
  extend?: ConfigExtension
}

export type CallableConfig = () => Config

export type ServerConfig = {
  auth?: CallableConfig
  port?: number
  models: ConfigModels
}
