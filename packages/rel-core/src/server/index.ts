import Fastify, { FastifyInstance } from "fastify"
import { ApolloServer } from "apollo-server-fastify"

import { Module } from "../types"
import { generate } from "../runtime"
import Events, { EVENTS } from "../util/events"

import { logger } from "./logging"
import { makeExecutableSchema } from "@graphql-tools/schema"

type ServerConfig = Module & {
  port?: number
}

class Server {
  port: number
  config: Module
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

  async start() {
    const { typeDefs, resolvers, directives } = generate(this.config)
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      directiveResolvers: directives,
    })

    const server = new ApolloServer({
      // typeDefs,
      schema,
      resolvers,
      plugins: [logger],
      formatError: (err) => {
        Events.error(err.originalError)

        // Don't give the specific errors to the client.
        if (err.message.startsWith("Database Error: ")) {
          return new Error("Internal server error")
        }

        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err
      },
    })

    this.app.register(server.createHandler())

    return this.app
      .listen(this.port)
      .then(() => ({ typeDefs, port: this.port }))
  }

  async stop() {
    return this.app?.close()
  }
}

export default (config) => new Server(config)
