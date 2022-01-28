import { buildGraphbackAPI, createCRUDService } from 'graphback'
import { createRedisGraphProvider } from 'runtime-redisgraph'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import fs from 'fs'
import { directives } from '@graphback/core'
import { RedisPubSub } from 'graphql-redis-subscriptions'

export default async ({ dir }) => {
  const dataProviderCreator = createRedisGraphProvider()
  const schema_ =
    directives + '\n' + fs.readFileSync(dir + '/schema.graphql').toString()
  const { typeDefs, resolvers, schema, services, contextCreator } =
    await buildGraphbackAPI(schema_, {
      dataProviderCreator,
      serviceCreator: createCRUDService({
        pubSub: new RedisPubSub(),
      }),
      plugins: [
        new SchemaCRUDPlugin({
          outputPath: dir + '/gen/schema.graphql',
        }),
      ],
    })
  return { typeDefs, schema, resolvers, services, contextCreator }
}
