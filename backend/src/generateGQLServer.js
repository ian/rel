import { buildGraphbackAPI,createCRUDService } from 'graphback'
import { createRedisGraphProvider } from 'runtime-redisgraph'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import fs from 'fs'
import { packageDirectorySync } from 'pkg-dir'
import { RedisPubSub } from 'graphql-redis-subscriptions'

const dir = packageDirectorySync()

export default () => {
  const dataProviderCreator = createRedisGraphProvider()
  const schema_ = fs.readFileSync(dir + '/schema.graphql')
  const { typeDefs, resolvers, schema, services, contextCreator } = buildGraphbackAPI(schema_.toString(), {
    dataProviderCreator,
    serviceCreator: createCRUDService({
      pubSub: new RedisPubSub()
    }),
    plugins: [
      new SchemaCRUDPlugin({
        outputPath: dir + '/schema/schema.graphql',
      }),
    ],
  })
  return { typeDefs, schema, resolvers, services, contextCreator }
}
