import { createServer } from 'graphql-yoga'

import { FastifyInstance } from 'fastify'
import AltairFastify from 'altair-fastify-plugin'
import goTrace from '@go-trace/tracer'

// ////////////////////////
// move me
import Logger from '@ptkdev/logger'
import { GraphQLSchema } from 'graphql'
type Opts = {
  schema: GraphQLSchema
  contextCreator: any // what is this?
  logger: Logger
}
// ////////////////////////

export default async function GraphQLPlugin(
  app: FastifyInstance,
  opts: Opts
): Promise<void> {
  const { schema, contextCreator, logger } = opts

  const graphQLServer = createServer({
    schema,
    context: contextCreator,
    enableLogging: false,
  })

  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      let response
      if (process.env.REL_TRACE && req.headers.accept !== 'text/event-stream') {
        const hasQuery = Object.keys(req.query).length > 0
        response = await goTrace(
          schema,
          // @ts-ignore
          hasQuery ? req.query.query : req.body.query,
          null,
          contextCreator(),
          // @ts-ignore
          hasQuery ? JSON.parse(req.query.variables) : req.body.variables
        )
        reply.status(200)
        reply.send(response)
      } else {
        response = await graphQLServer.handleIncomingMessage(req)
        response.headers.forEach((value, key) => {
          reply.header(key, value)
        })
        reply.status(response.status)
        reply.send(response.body)
      }
    },
  })

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  app.register(AltairFastify, {
    /**
     * All these are the defaults.
     */
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    // decorateReply: false,
  })
}
