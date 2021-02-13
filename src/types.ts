export type Field = {
  gqlName: string
  isRequired: boolean
}

export type Fields = {
  [key: string]: Field
}

export type From = {
  label: string
  params?: (any) => object
}

export type To = {
  label: string
  params?: (any) => object
}

export enum Direction {
  IN = "IN",
  OUT = "OUT",
}

export type Rel = {
  label: string
  direction?: Direction
}

export type Relation = {
  from: From
  to: To
  rel: Rel
  direction?: Direction
  singular?: boolean
  order?: string
}

export type Relations = {
  [key: string]: Relation
}

export type Accessors = {
  find?: boolean
  list?: boolean
}

export type Schema = {
  accessors: Accessors
  fields: Fields
  relations: Relations
}

export type Config = {
  port?: number
  schema: Schema
}
