import { renderPlaygroundPage } from 'graphql-playground-html'

import { FastifyInstance } from 'fastify'
import { createServer } from '@graphql-yoga/node'

// import AltairFastify from 'altair-fastify-plugin'
// import goTrace from '@go-trace/tracer'

import Graphback from './graphback'

// ////////////////////////
// ////////////////////////
// move me
import Logger from '@ptkdev/logger'
import { Readable } from 'stream'

type Opts = {
  // schema: GraphQLSchema
  // resolvers: object
  // contextCreator: any // what is this?
  schema: string
  outputPath: string
  logger: Logger
}
// ////////////////////////
// ////////////////////////

export default async function GraphQLPlugin(
  app: FastifyInstance,
  opts: Opts
): Promise<void> {
  const { schema: baseSchema, outputPath, logger } = opts

  const graphback = await Graphback({
    schema: baseSchema,
    outputPath,
    logger,
  })

  const { schema, contextCreator } = graphback

  const graphQLServer = createServer({
    schema,
    context: contextCreator,
    logging: {
      prettyLog: true,
      logLevel: 'debug',
    },

    // plugins: [useGraphQLModules(createGraphQLApp())],
  })

  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await graphQLServer
        .handleIncomingMessage(req)
        // .catch(console.error)

      response.headers.forEach((value, key) => {
        reply.header(key, value)
      })

      const nodeStream = Readable.from(response.body as any)
      reply.status(response.status).send(nodeStream)
    },
  })

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  // GraphQL Playground
  app.get('/', async (_, reply) => {
    reply.headers({
      'Content-Type': 'text/html',
    })

    reply.send(
      renderPlaygroundPage({
        endpoint: `/graphql`,
      })
    )
    reply.status(200)
  })

  // app.register(AltairFastify, {
  //   /**
  //    * All these are the defaults.
  //    */
  //   path: '/altair',
  //   baseURL: '/altair/',
  //   endpointURL: '/graphql',
  //   // decorateReply: false,
  // })
}
