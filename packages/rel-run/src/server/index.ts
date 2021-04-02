import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"

import { Module, EVENTS } from "@reldb/types"
import { init } from "@reldb/cypher"
import { generate } from "../runtime"
import Events from "./events"

import { logger } from "./logging"
import { makeExecutableSchema } from "@graphql-tools/schema"

type ServerConfig = Module & {
  port?: number
}

class Server {
  port: number
  config: Module
  plugins: Module[] = []
  app: FastifyInstance

  constructor(server: ServerConfig) {
    const { port = 3282, ...config } = server

    this.port = port
    this.config = config
    this.app = Fastify({ logger: false })
  }

  on(event: EVENTS, handler) {
    return Events.on(event, handler)
  }

  plugin(plugin: Module) {
    this.config.plugins ||= []
    this.config.plugins.push(plugin)

    return this
  }

  runtime() {
    const { typeDefs, resolvers, directives } = generate(this.config)

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

        this.app.register(
          server.createHandler({
            disableHealthCheck: true,
          })
        )

        return this.app
          .listen(this.port)
          .then(() => ({ events: Events, typeDefs, port: this.port }))
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
    return this.app?.close()
  }
}

export default (config) => new Server(config)
