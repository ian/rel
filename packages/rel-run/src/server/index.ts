import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"

import {
  AuthModel,
  AuthStrategy,
  Guards,
  Plugin,
  Schema,
  EVENTS,
} from "@reldb/types"
import { init } from "@reldb/cypher"
import { runtime } from "../runtime"
import Events from "./events"

import { logger } from "./logging"
import { makeExecutableSchema } from "@graphql-tools/schema"

type ServerConfig = {
  port?: number
}

class Server {
  _port: number
  _app: FastifyInstance
  _auth: { model: AuthModel; strategies?: AuthStrategy[] } = null
  _guards: Guards = {}
  _plugins: Plugin[] = []
  _schema: Schema

  constructor(config: ServerConfig) {
    const { port = 3282 } = config

    this._port = port
    this._app = Fastify({ logger: false })
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
    const { typeDefs, resolvers, directives } = runtime({
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
      }
    } catch (err) {
      console.log(typeDefs)
      Events.error(err)
    }
  }

  async start() {
    if (
      process.env.NEO4J_URI &&
      process.env.NEO4J_USERNAME &&
      process.env.NEO4J_PASSWORD
    ) {
      init({
        url: process.env.NEO4J_URI,
        username: process.env.NEO4J_USERNAME,
        password: process.env.NEO4J_PASSWORD,
        logger: Events.cypher,
      })
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
    } else {
      Events.error(
        new Error(
          "Missing Neo4j Connection details, please set NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD"
        )
      )
    }
  }

  async stop() {
    return this._app?.close()
  }
}

export default (config: ServerConfig) => new Server(config)
