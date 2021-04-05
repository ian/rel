import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"

import {
  AuthModel,
  AuthStrategy,
  Guards,
  Plugin,
  Schema,
  EVENTS,
} from "../types"
import { runtime } from "../runtime"
import Events from "./events"

import { logger } from "./logging"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { CypherInstance, ConnectionConfig } from "../cypher/connection"

type ServerConfig = {
  port?: number
  db: ConnectionConfig
}

class Server {
  _port: number
  _app: FastifyInstance
  _auth: { model: AuthModel; strategies?: AuthStrategy[] } = null
  _db: ConnectionConfig = null
  _guards: Guards = {}
  _plugins: Plugin[] = []
  _schema: Schema

  constructor(config: ServerConfig) {
    const { db, port = 3282 } = config

    this._port = port
    this._app = Fastify({ logger: false })
    this._db = db
  }

  on(event: EVENTS, handler) {
    return Events.on(event, handler)
  }

  auth(model: AuthModel, strategies?: AuthStrategy[]) {
    this._auth = {
      model,
      strategies,
    }

    return this
  }

  guards(guards: Guards) {
    this._guards = guards
  }

  schema(schema: Schema) {
    this._schema = schema

    return this
  }

  plugin(plugin: Plugin) {
    this._plugins.push(plugin)

    return this
  }

  runtime() {
    const { cypher, typeDefs, resolvers, directives } = runtime({
      db: this._db,
      auth: this._auth,
      guards: this._guards,
      schema: this._schema,
      // plugins: this._plugins,
    })

    try {
      const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
        directiveResolvers: directives,
      })

      const server = new ApolloServer({
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

      return {
        typeDefs,
        server,
        cypher,
      }
    } catch (err) {
      console.log(typeDefs)
      Events.error(err)
    }
  }

  async start() {
    const runtime = this.runtime()

    if (runtime) {
      const { typeDefs, server } = runtime

      this._app.register(
        server.createHandler({
          disableHealthCheck: true,
        })
      )

      return this._app
        .listen(this._port)
        .then(() => ({ events: Events, typeDefs, port: this._port }))
    }
  }

  async stop() {
    return this._app?.close()
  }
}

export default (config: ServerConfig) => new Server(config)
