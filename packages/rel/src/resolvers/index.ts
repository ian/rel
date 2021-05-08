import { CypherInstance } from "../cypher/connection"

export type ResolverOpts = {
  cypher: CypherInstance
}

export * from "./schema"
export * from "./directives"
