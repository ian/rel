import Fastify from "fastify"
import mercurius from "mercurius"

import { generate, GeneratorOpts } from "../generator"

type ServerConfig = GeneratorOpts & {
  port?: number
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

    return app.listen(this.port).then(() => ({ typeDefs, port: this.port }))
  }
}

export * from "../generator/types"
export default (config) => new Server(config)
