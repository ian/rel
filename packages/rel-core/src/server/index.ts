import Fastify, { FastifyInstance } from "fastify"
import { graphql } from "graphql"
import { formatSdl } from "format-graphql"

import { Module } from "../types"
import { generate } from "../runtime"
import Events, { EVENTS } from "../util/events"

type ServerConfig = Module & {
  port?: number
}

type GrapqQLRequest = {
  query: string
  variables?: object
  operationName: string
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
    const { typeDefs, schema } = generate(this.config)

    this.app.setErrorHandler(function (error, request, reply) {
      // @todo Send error response?
      Events.error(error)
    })

    this.app.post("/graphql", async function (req, reply) {
      const { query, variables, operationName } = req.body as GrapqQLRequest
      const context = {}

      const startTime = process.hrtime()
      const gql = await graphql(
        schema,
        query,
        {},
        context,
        variables
        // operationName
      ).catch((err) => {
        Events.error(err)
      })

      reply.status(200).send(gql)

      const time = process.hrtime(startTime)

      Events.graphql(
        {
          operationName,
          query: formatSdl(query, {
            sortDefinitions: false,
            sortFields: false,
          }),
          variables,
        },
        time
      )
    })

    return this.app
      .listen(this.port)
      .then(() => ({ typeDefs, port: this.port }))
  }

  async stop() {
    return this.app?.close()
  }
}

export default (config) => new Server(config)
