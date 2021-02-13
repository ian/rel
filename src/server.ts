import Fastify from "fastify"
import mercurius from "mercurius"

import { generate } from "./generator"
import { Config, Schema } from "./types"

class Server {
  port: number
  schema: Schema

  constructor(config: Config) {
    const { port = 4000, schema } = config
    this.port = port
    this.schema = schema
  }

  async run() {
    const { schema, resolvers } = generate(this.schema)

    const app = Fastify({ logger: false })
    app.register(mercurius, {
      schema,
      resolvers,
    })

    app.post("/", async function (req, reply) {
      // @ts-ignore
      const { query } = req.body

      return reply
        .graphql(query)
        .then((json) => JSON.stringify(json, null, 2))
        .catch((err) => {
          console.error(err)
          return {
            statusCode: err.statusCode,
            errors: err.errors.map((e) => e.message),
          }
        })
    })

    return app
      .listen(this.port)
      .then(() => ({ schema, resolvers, port: this.port }))
  }
}

export default (config) => new Server(config)
