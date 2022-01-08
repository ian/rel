// import loadListeners from './loadListeners.js'
import AltairFastify from 'altair-fastify-plugin'
import generateGQLClient from './generateGQLClient.js'
import generateGQLServer from './generateGQLServer.js'
import { packageDirectorySync } from 'pkg-dir'
import Fastify from 'fastify'
import goTrace from '@go-trace/tracer'
import Logger from '@ptkdev/logger'
import fastifyCors from 'fastify-cors'
import * as yoga from 'graphql-yoga'

export default (config) => {
  const logger = new Logger({
    debug: !!process.env.REL_DEBUG,
  })

  const port = Number(process.env.REL_PORT) || 4000
  const host = process.env.REL_HOST || 'localhost'
  const app = Fastify()
  const dir = packageDirectorySync() + '/rel'

  app.register(fastifyCors)
  app.register(AltairFastify, {
    /**
     * All these are the defaults.
     */
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    decorateReply: false,
  })

  // make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT

  const { schema, contextCreator } = generateGQLServer({
    dir,
    logger,
  })

  // logger.info(`Schema generated at ${dir + "/schema"}`, "INIT");

  const graphQLServer = new yoga.GraphQLServer({
    schema,
    context: contextCreator,
    enableLogging: false,
  })

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      let response
      if (process.env.REL_TRACE && req.headers.accept !== 'text/event-stream') {
        const hasQuery = Object.keys(req.query).length > 0
        response = await goTrace(
          schema,
          hasQuery ? req.query.query : req.body.query,
          null,
          contextCreator(),
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

  app.listen({ port, host })

  logger.info(`Rel Server started in http://${host}:${port}`, 'INIT')
  logger.info(`Svelte example enabled at http://${host}:${port}/svelte`, 'INIT')
  logger.info(
    `Altair GraphQL Client enabled at http://${host}:${port}/altair`,
    'INIT'
  )

  // loadListeners();
  generateGQLClient({
    dir,
    logger,
  })

  return app
}
