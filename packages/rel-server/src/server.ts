import loadListeners from './listeners'
import fs from 'fs'

import generateGQLClient from './client.js'
import Fastify, { FastifyInstance } from 'fastify'
import Logger from '@ptkdev/logger'
import fastifyCors from 'fastify-cors'

import GraphQL from './graphql'
import Graphback from './graphback'

export default async function Server(config): Promise<FastifyInstance> {
  const { dir } = config

  const app = Fastify()
  const port = Number(process.env.REL_PORT) || 4000
  const host = process.env.REL_HOST || 'localhost'

  const logger = new Logger({
    debug: !!process.env.REL_DEBUG,
  })

  console.log({ dir })

  const graphback = await Graphback({
    schema: fs.readFileSync(dir + '/schema.graphql').toString(),
    outputPath: dir + '/gen/schema.graphql',
    logger,
  })

  // make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT
  // @todo - check for redis running

  app.register(fastifyCors)
  app.register(GraphQL, {
    ...graphback,
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
