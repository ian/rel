import Fastify, { FastifyInstance } from "fastify"
import cors from "fastify-cors"
import mercurius from "mercurius"
import { renderPlaygroundPage } from "graphql-playground-html"

// import { plugin as bullboard } from "./jobs"
// import { emitter } from "../pubsub"

export type Config = {
  schema: string
  resolvers: {
    [key: string]: any
  }
}

export type ServerInstance = FastifyInstance & {
  start: () => Promise<void>
  graphql: (query: string, variables?: any) => Promise<any>
}

export default function ServerInstance(config: Config) {
  const { schema, resolvers } = config

  this.app = Fastify()

  // Mercurius GraphQL
  this.app.register(mercurius, {
    schema,
    resolvers,
    // subscription: {
    //   emitter,
    //   // verifyClient: (info, next) => {
    //   //   if (info.req.headers['x-fastify-header'] !== 'fastify is awesome !') {
    //   //     return next(false) // the connection is not allowed
    //   //   }
    //   //   next(true) // the connection is allowed
    //   // },
    // },
  })

  // // Setup BullMQ
  // app.register(bullboard, {
  //   path: "/jobs",
  // })

  // CORS
  this.app.register(cors, {
    origin: "*",
  })

  // GraphQL Playground
  this.app.get("/playground", async (req, reply) => {
    reply.headers({
      "Content-Type": "text/html",
    })
    reply.send(
      renderPlaygroundPage({
        endpoint: `/graphql`,
      })
    )
    reply.status(200)
  })

  this.start = async () =>
    this.app
      .listen(process.env.PORT || 4000, "0.0.0.0")
      .then((url) => console.log(`🚀  Server ready at ${url}`))

  this.graphql = async (query: string, variables?: any) => {
    await this.app.ready()
    return this.app.graphql(query, variables).catch(console.error)
  }
}
