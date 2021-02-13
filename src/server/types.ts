export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export type ConfigField = {
  gqlName: string
  isRequired: boolean
}

export type ConfigFields = {
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

export type ConfigSchema = {
  accessors: ConfigAccessors
  fields: ConfigFields
  relations: ConfigRelations
}

export type Config = {
  port?: number
  schema: ConfigSchema
}
