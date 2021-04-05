import { AuthModel, AuthStrategy, Guards, Plugin, Schema } from "../types"
import { ConnectionConfig } from "../cypher"
import { generateResolvers, generateDirectiveResolvers } from "./resolvers"
import { generateTypeDefs } from "./typeDefs"
import Reducer from "./reducer"
import Cypher from "../cypher"
import Events from "../server/events"

export { default as Reducer } from "./reducer"

export type RuntimeOpts = {
  auth?: { model: AuthModel; strategies?: AuthStrategy[] }
  schema?: Schema
  guards?: Guards
  plugins?: Plugin[]
}

export type RuntimeConfig = {
  db: ConnectionConfig
} & RuntimeOpts

export function runtime(config: RuntimeConfig) {
  const { db, auth, guards, schema } = config
  const reducer = new Reducer()

  if (!db) {
    Events.error(
      new Error(
        "Missing Neo4j Connection details, please set NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD"
      )
    )
  }

  const cypher = Cypher.init(db)

  if (auth) {
    auth.model?.reduce(reducer.reduce, { cypher })
    auth.strategies?.forEach((strategy) =>
      strategy.reduce(reducer.reduce, { cypher })
    )
  }

  reducer.reduce({ guards, schema })

  const reduced = reducer.toReducible()

  const typeDefs = generateTypeDefs(reduced)
  const resolvers = generateResolvers(reduced, { cypher })
  const directives = generateDirectiveResolvers(reduced, { cypher })

  try {
    return {
      cypher,
      typeDefs,
      resolvers,
      directives,
    }
  } catch (err) {
    throw err
  }
}
