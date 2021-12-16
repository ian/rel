import loadListeners from './loadListeners.js'
import generateGQLClient from './generateGQLClient.js'
import generateGQLServer from './generateGQLServer.js'
import { packageDirectorySync } from 'pkg-dir'
import { makeExecutableSchema } from '@graphql-tools/schema'
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
  endpointURL: '/svelte'
})

// make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT

const { services, contextCreator, resolvers, typeDefs } = generateGQLServer() 

const schema = makeExecutableSchema({typeDefs, resolvers: [resolvers]})

app.register(mercurius, {
  schema,
  context: contextCreator,
  subscription: true,
  graphiql: true
})

app.listen(4000)

loadListeners()
generateGQLClient()
