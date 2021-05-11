import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"

import { Plugin, Model, Endpoint, ServerEvents } from "../types"
import Hydrator from "./hydrator"
import Events from "./events"

import { logger } from "./logging"
import Cypher, { ConnectionConfig } from "../cypher"
import { CypherInstance } from "../cypher/connection"

export type ServerConfig = {
  port?: number
  db: ConnectionConfig
}

export default class Server {
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
          "Missing DB Connection details, please set DB_HOST, DB_USERNAME, DB_PASSWORD"
        )
      )
    }

    this._port = port
    this._app = Fastify({ logger: false })
    this._db = db
    this._cypher = Cypher.init(db)
  }

  on(event: ServerEvents, handler) {
    return Events.on(event, handler)
  }

  models(...models: Model[]) {
    this.schema(...models)
    return this
  }

  schema(...models: Model[]) {
    this._hydrator.schema(...models)
    return this
  }

  auth(...auth: Plugin[]) {
    this._hydrator.auth(...auth)
    return this
  }

  plugins(...plugins: Plugin[]) {
    this._hydrator.plugins(...plugins)
    return this
  }

  // IH: Unsure if we want to support this
  // directives(...guards: Guard[]) {
  //   this._hydrator.directives(...guards)
  //   return this
  // }

  endpoints(...endpoints: Endpoint[]) {
    this._hydrator.endpoints(...endpoints)
    return this
  }

  runtime() {
    const { schema, typeDefs } = this._hydrator.runtime()

    try {
      const apollo = new ApolloServer({
        schema,
        plugins: [logger],
        context: ({ req }) => ({
          cypher: this._cypher,
        }),
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

      const graphql = async (query, variables?, http?) =>
        apollo.executeOperation({ query, variables, http })

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
        .listen(this._port, "0.0.0.0")
        .then(() => ({ events, typeDefs, port: this._port, graphql }))
    }
  }

  async stop() {
    return this._app?.close()
  }
}
