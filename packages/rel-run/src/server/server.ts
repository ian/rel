import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"
import { makeExecutableSchema } from "@graphql-tools/schema"

import {
  AuthModel,
  AuthStrategy,
  Guards,
  Plugin,
  Schema,
  Endpoint,
  EVENTS,
} from "../types"
import Hydrator from "./hydrator"
import Events from "./events"

import { logger } from "./logging"
import { generateResolvers, generateDirectiveResolvers } from "./resolvers"
import { generateTypeDefs } from "./typeDefs"
import Cypher, { ConnectionConfig } from "../cypher"
import { CypherInstance } from "../cypher/connection"

export type ServerConfig = {
  port?: number
  db: ConnectionConfig
}

export class Server {
  _port: number
  _app: FastifyInstance
  _db: ConnectionConfig = null
  _cypher: CypherInstance
  _hydrator = new Hydrator()

  constructor(config: ServerConfig) {
    const { db, port = 3282 } = config

    if (!db) {
      Events.error(
        new Error(
          "Missing Neo4j Connection details, please set NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD"
        )
      )
    }

    this._port = port
    this._app = Fastify({ logger: false })
    this._db = db
    this._cypher = Cypher.init(db)
  }

  on(event: EVENTS, handler) {
    return Events.on(event, handler)
  }

  auth(model: AuthModel, strategies?: AuthStrategy[]) {
    model?.hydrate(this._hydrator, { cypher: this._cypher })
    strategies?.forEach((strategy) =>
      strategy.hydrate(this._hydrator, { cypher: this._cypher })
    )

    return this
  }

  guards(guards: Guards) {
    this._hydrator.guards(guards)
    return this
  }

  endpoints(endpoints: Endpoint | Endpoint[]) {
    this._hydrator.endpoints(endpoints)
    return this
  }

  plugins(plugins: Plugin | Plugin[]) {
    Array(plugins)
      .flat()
      .forEach((plugin) => {
        plugin(this._hydrator)
      })
    return this
  }

  schema(schema: Schema) {
    this._hydrator.schema(schema)
    return this
  }

  runtime() {
    const reduced = this._hydrator.reduced()

    const typeDefs = generateTypeDefs(reduced)
    const resolvers = generateResolvers(reduced, { cypher: this._cypher })
    const directives = generateDirectiveResolvers(reduced, {
      cypher: this._cypher,
    })

    try {
      const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
        directiveResolvers: directives,
      })

      const apollo = new ApolloServer({
        schema,
        resolvers,
        plugins: [logger],
        formatError: (err) => {
          // Don't give the specific errors to the client.
          if (err.message.startsWith("Database Error: ")) {
            return new Error("Internal server error")
          }

          // Otherwise return the original error. The error can also
          // be manipulated in other ways, as long as it's returned.
          return err
        },
      })

      const graphql = async (query, variables?) =>
        apollo.executeOperation({ query, variables })

      this._app.register(
        apollo.createHandler({
          disableHealthCheck: true,
        })
      )

      return {
        cypher: this._cypher,
        events: Events,
        graphql,
        typeDefs,
      }
    } catch (err) {
      console.log(typeDefs)
      Events.error(err)
    }
  }

  async start() {
    const runtime = this.runtime()

    if (runtime) {
      const { events, typeDefs, graphql } = runtime

      return this._app
        .listen(this._port)
        .then(() => ({ events, typeDefs, port: this._port, graphql }))
    }
  }

  async stop() {
    return this._app?.close()
  }
}
