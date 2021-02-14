import Fastify from "fastify"
import mercurius from "mercurius"
import { makeExecutableSchema } from "@graphql-tools/schema"

import { generate } from "../generator"
import { Config, ConfigAuth, ConfigSchema } from "./types"

class Server {
  auth: ConfigAuth
  port: number
  schema: ConfigSchema

  constructor(config: Config) {
    const { auth, port = 4000, schema } = config
    this.auth = auth
    this.port = port
    this.schema = schema
  }

  async run() {
    const { schema, resolvers, directives } = generate({
      auth: this.auth,
      schema: this.schema,
    })

    const app = Fastify({ logger: false })

    app.register(mercurius, {
      schema: makeExecutableSchema({
        typeDefs: schema,
        resolvers,
        directiveResolvers: directives,
      }),
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

export * from "./types"
export default (config) => new Server(config)
