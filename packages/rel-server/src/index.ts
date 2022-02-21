import { GraphQLSchema } from "graphql"
import { Client } from "cyypher"
import { Readable } from "stream"
import Fastify, { FastifyInstance } from "fastify"
import { createServer } from "@graphql-yoga/node"
import { renderPlaygroundPage } from "graphql-playground-html"

import { addResolversToSchema } from "@graphql-tools/schema"
import { makeAugmentedSchema } from "./schema/makeAugmentedSchema"
import { printSchema } from "graphql-compose"

type Config = {
  typeDefs: string
  resolvers?: object
  connection: string
}

export default class Server {
  private connection: string
  private typeDefs: string
  private resolvers: object

  private app: FastifyInstance

  // private _nodes?: Node[]
  // private _relationships?: Relationship[]

  constructor(config: Config) {
    const { connection, typeDefs, resolvers } = config
    this.connection = connection
    this.typeDefs = typeDefs
    this.resolvers = resolvers
    this.app = Fastify({
      trustProxy: true,
    })
  }

  private async generateSchema(): Promise<GraphQLSchema> {
    const augmentedSchema = makeAugmentedSchema(this.typeDefs)
    const resolvers = {}

    return addResolversToSchema(augmentedSchema, resolvers)
  }

  async listen(port: number | string) {
    const schema = await this.generateSchema()
    const cypher = new Client(this.connection)

    const graphQLServer = createServer({
      schema,
      context: async (context: any) => {
        return {
          cypher,
          ...context,
        }
      },
      logging: {
        prettyLog: false,
        logLevel: "info",
      },
    })

    this.app.route({
      url: "/graphql",
      method: ["POST", "OPTIONS"],
      handler: async (req, reply) => {
        const response = await graphQLServer.handleIncomingMessage(req)
        response.headers.forEach((value, key) => {
          reply.header(key, value)
        })
        const nodeStream = Readable.from(response.body as any)
        reply.status(response.status).send(nodeStream)
      },
    })

    // GraphQL Playground
    this.app.get("/", async (_, reply) => {
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

    return this.app.listen(port).then(() => {
      const generatedSchema = printSchema(schema)
      return {
        port,
        generatedSchema,
      }
    })
  }

  async kill() {
    this.app.close()
  }
}
