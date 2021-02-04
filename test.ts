import boxen from "boxen"
import Fastify from "fastify"
import mercurius from "mercurius"

import { generate } from "./src/generator"
import { string } from "./src/fields"

const example = {
  Person: {
    fields: {
      name: string().required(),
      // born: int()
      // optional: string(),
    },
    accessors: {
      // find: true,
      list: true,
    },
  },
  Movie: {
    fields: {
      title: string().required(),
      // released: int()
      tagline: string(),
    },
  },
}

const { schema, resolvers } = generate(example)

console.log(boxen(schema.trim(), { margin: 0.5, padding: 1 }))
console.log("Resolvers:", resolvers)

const app = Fastify()

app.register(mercurius, {
  schema,
  resolvers,
})

app.get("/", async function (req, reply) {
  const query = `
query { 
  ListPeople {
    name
  }
}
  `
  return reply.graphql(query).catch((err) => {
    console.error(err)
  })
})

app.listen(3000)

console.log()
console.log(`Server started on port ${3000}`)
console.log()
