import loadListeners from './loadListeners.js'
import AltairFastify from 'altair-fastify-plugin'
import generateGQLClient from './generateGQLClient.js'
import generateGQLServer from './generateGQLServer.js'
import { packageDirectorySync } from 'pkg-dir'
import fastifyStatic from 'fastify-static'
import Fastify from 'fastify'
import path from 'path'
import mercurius from 'mercurius'
import Logger from '@ptkdev/logger'
const logger = new Logger({
  debug: !!process.env.REL_DEBUG
})

const port = Number(process.env.REL_PORT) || 4000
const host = process.env.REL_HOST || '127.0.0.1'
const app = Fastify()
const dir = packageDirectorySync()

app.register(fastifyStatic, {
  root: path.join(dir, '/frontend/svelte-typescript-app/public'),
  prefix: '/svelte',
  path: '/svelte',
  baseURL: '/svelte/',
  endpointURL: '/svelte',
  decorateReply: false
})

app.register(AltairFastify, {
  /**
   * All these are the defaults.
   */
  path: '/altair',
  baseURL: '/altair/',
  endpointURL: '/graphql',
  decorateReply: false
})

// make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT

const { schema, contextCreator } = generateGQLServer()

logger.info(`Schema generated at ${dir + '/schema'}`, 'INIT')

app.register(mercurius, {
  schema,
  context: contextCreator,
  subscription: {
    context: contextCreator
  },
  graphiql: true
})

app.listen({ port, host })

logger.info(`Rel Server started in ${host}:${port}`, 'INIT')

loadListeners()
generateGQLClient()
logger.info(`GraphQL Client generated at ${dir + '/gql-client'}`, 'INIT')
