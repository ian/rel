import loadListeners from './loadListeners.js'
import AltairFastify from 'altair-fastify-plugin'
import generateGQLClient from './generateGQLClient.js'
import generateGQLServer from './generateGQLServer.js'
import { packageDirectorySync } from 'pkg-dir'
import fastifyStatic from 'fastify-static'
import Fastify from 'fastify'
import path from 'path'
import mercurius from 'mercurius'

const app = Fastify()
const dir = packageDirectorySync()

app.register(fastifyStatic, {
  root: path.join(dir, '/frontend/svelte-typescript-app/public'),
  prefix: "/svelte",
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

const { schema, services, contextCreator, resolvers, typeDefs } = generateGQLServer() 

app.register(mercurius, {
  schema,
  context: contextCreator,
  subscription: {
    context: contextCreator,
  },
  graphiql: true
})

app.listen(4000)

loadListeners()
generateGQLClient()
