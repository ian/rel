import Fastify from "fastify"
import mercurius from "mercurius"
import { formatSdl } from "format-graphql"

import { generate, GeneratorOpts } from "../generator"

type ServerConfig = GeneratorOpts & {
  port?: number
}

type GrapqQLRequest = {
  query: string
  variables?: object
  operationName: string
}

class Server {
  port: number
  config: ServerConfig

  constructor(server: ServerConfig) {
    const { port = 4000, ...config } = server

    this.port = port
    this.config = config
  }

  async run() {
    const { typeDefs, schema } = generate(this.config)

    const app = Fastify({ logger: false })

    app.register(mercurius, {
      schema,
      errorHandler: (error, request, reply) => {
        console.error("mercurius ERROR", error)

        return {
          statusCode: error.statusCode,
          // errors: [error.message],
          errors: [],
        }
      },
      ide: true,
    })

    app.setErrorHandler(function (error, request, reply) {
      // Send error response
      console.log(error)
      console.error(error)
    })

    app.post("/", async function (req, reply) {
      const { query, variables, operationName } = req.body as GrapqQLRequest

      console.log("GRAPHQL\n")
      console.log(
        formatSdl(query, {
          sortDefinitions: false,
          sortFields: false,
        })
      )
      console.log(JSON.stringify(variables, null, 2))

      const context = {}

      return reply
        .graphql(query, context, variables)
        .then((json) => JSON.stringify(json, null, 2))
        .catch((error) => {
          console.error("graphql catch", error)

          return {
            statusCode: error.statusCode,
            errors: error.errors,
          }
        })
    })

    return app.listen(this.port).then(() => ({ typeDefs, port: this.port }))
  }
}

export default (config) => new Server(config)
