import boxen from "boxen"
import Fastify from "fastify"
import mercurius from "mercurius"

import { generate } from "./src/generator"
import { string } from "./src/fields"
import { error } from "console"

const example = {
  Person: {
    fields: {
      name: string().required(),
    },
    accessors: {
      find: {
        findBy: ["name"],
      },
      list: true,
    },
  },
  Movie: {
    fields: {
      title: string().required(),
      tagline: string(),
    },
    accessors: {
      find: true,
      list: true,
    },
  },
}

const { schema, resolvers } = generate(example)

console.log()
console.log(boxen(schema.trim(), { margin: 0.5, padding: 1 }))
console.log(resolvers)

const app = Fastify({ logger: true })

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

app.listen(3000)

console.log()
console.log(`Server started on port ${3000}`)
console.log()
