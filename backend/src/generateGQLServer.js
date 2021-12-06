import { buildGraphbackAPI } from 'graphback'
import { createRedisGraphProvider } from 'runtime-redisgraph'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import fs from 'fs'
import { packageDirectorySync } from 'pkg-dir'

const dir = packageDirectorySync()

export default () => {
  const dataProviderCreator = createRedisGraphProvider()
  const schema = fs.readFileSync(dir + '/schema.graphql')
  const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema.toString(), {
    dataProviderCreator,
    plugins: [
      new SchemaCRUDPlugin({
        outputPath: dir + '/schema/schema.graphql',
      }),
    ],
  })
  return { typeDefs, resolvers, contextCreator }
}
