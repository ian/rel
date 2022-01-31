import { buildGraphbackAPI, createCRUDService } from 'graphback'
import { createRedisGraphProvider } from 'graphback-redisgraph'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import { directives } from '@graphback/core'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Logger from '@ptkdev/logger'

type Params = {
  schema: string
  logger: Logger
  outputPath: string
}

export default async function Graphback(params: Params) {
  const { logger, schema, outputPath } = params

  const dataProviderCreator = createRedisGraphProvider()
  const typeDefs = directives + '\n' + schema

  logger?.info(`Schema generated at ${outputPath}`, 'INIT')

  return buildGraphbackAPI(typeDefs, {
    dataProviderCreator,
    serviceCreator: createCRUDService({
      pubSub: new RedisPubSub(),
    }),
    plugins: [
      new SchemaCRUDPlugin({
        outputPath,
      }),
    ],
  })
}
