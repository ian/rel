// import loadListeners from './listeners'

import fs from 'fs'
import Fastify, { FastifyInstance } from 'fastify'

import generateGQLClient from './client.js'
import Logger from '@ptkdev/logger'

import Cors from 'fastify-cors'
import Auth from './auth'
import GraphQL from './graphql'

type Config = {
  auth: any, // @todo ian
  dir: string // @todo I want to change this to be schema string, so we can load from wherever.
}

export default async function Server(config: Config): Promise<FastifyInstance> {
  const { auth, dir } = config

  const app = Fastify()
  const port = Number(process.env.REL_PORT) || 4000
  const host = process.env.REL_HOST || 'localhost'

  const logger = new Logger({
    debug: !!process.env.REL_DEBUG,
  })

  const schema = fs.readFileSync(dir + '/schema.graphql').toString()

  // make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT
  // @todo - check for redis running

  app.register(Cors)

  app.register(Auth, {
    secret: process.env.JWT_SECRET,
    ...auth
  })

  app.register(GraphQL, {
    schema,
    outputPath: dir + '/gen/schema.graphql',
    logger,
  })
  
  app.listen({ port, host })

  logger.info(`Rel Server started in http://${host}:${port}`, 'INIT')

  // logger.info(`Svelte example enabled at http://${host}:${port}/svelte`, 'INIT')
  // logger.info(
  //   `Altair GraphQL Client enabled at http://${host}:${port}/altair`,
  //   'INIT'
  // )

  // loadListeners({
  //   dir,
  // }).catch((err) => console.error(err))

  generateGQLClient({
    dir,
    logger,
  })

  return app
}
