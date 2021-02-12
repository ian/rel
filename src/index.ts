import boxen from "boxen"
import Fastify from "fastify"
import mercurius from "mercurius"

import { generate } from "./generator"

// export * as fields from "yup"
export { default as fields } from "./fields"

export async function server(opts) {
  const { port, schema: relSchema } = opts
  const { schema, resolvers } = generate(relSchema)

  console.log()
  console.log(boxen(schema.trim(), { margin: 0.5, padding: 1 }))

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
        return {
          statusCode: err.statusCode,
          errors: err.errors.map((e) => e.message),
        }
      })
  })

  await app.listen(port)
}
