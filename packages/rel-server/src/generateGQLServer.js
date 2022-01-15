import { buildGraphbackAPI, createCRUDService } from 'graphback'
import { createRedisGraphProvider } from 'runtime-redisgraph'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import fs from 'fs'
import { RedisPubSub } from 'graphql-redis-subscriptions'

export default async ({ dir }) => {
  const dataProviderCreator = createRedisGraphProvider()
  const schema_ = fs.readFileSync(dir + '/schema.graphql')
  const { typeDefs, resolvers, schema, services, contextCreator } =
    await buildGraphbackAPI(schema_.toString(), {
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
