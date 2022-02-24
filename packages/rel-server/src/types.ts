import { Client } from "cyypher"

export type Field = {
  name: string
  type: string
  directives: Directive[]
}

export type Fields = {
  [name: string]: Field
}

export type Relation = {
  name: string
  type: string
  relation: RelationDirective
  directives: Directive[]
}

export type Relations = {
  [name: string]: Relation
}

export type Args = {}

export type Context = {
  cypher: Client
}

export type Directive = {
  name: string
  args: {
    [name: string]: string
  }[]
}

export type RelationDirective = {
  label: string
  direction: string
  type: string
}
