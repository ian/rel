import boxen from "boxen"
import { generate } from "./generator"
import { string } from "./fields"

import Fastify from "fastify"
import mercurius from "mercurius"

const example = {
  Author: {
    fields: {
      name: string().required(),
      optional: string(),
    },
    accessors: {
      find: true,
      list: true,
    },
  },
  Book: {
    fields: {
      name: string().required(),
    },
  },
}

const { schema, resolvers } = generate(example)

const app = Fastify()

app.register(mercurius, {
  schema,
  resolvers,
})

app.get("/", async function (req, reply) {
  const query = "{ add(x: 2, y: 2) }"
  return reply.graphql(query)
})

app.listen(3000)
