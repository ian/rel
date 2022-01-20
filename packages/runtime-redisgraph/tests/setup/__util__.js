import { buildSchema } from 'graphql'
import {
  GraphbackCoreMetadata,
  printSchemaWithDirectives,
  directives
} from '@graphback/core'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'
import { RedisGraphProvider } from '../../src/RedisGraphProvider.js'
import fs from 'fs'
// import Docker from 'dockerode'
import events from 'events'
import Redis from 'ioredis'
let createTestingContext
let redis

const run = async () => {
  process.env.REDIS_HOST = '127.0.0.1'
  process.env.REDIS_PORT = '6379'
  redis = new Redis({
    retryStrategy: attempt => {
      if (attempt > 10) { return new Error(`Can't connect to redis after ${attempt} tries..`) }
      return 250 * 2 ** attempt
    }
  })

  await events.once(redis, 'ready')
  createTestingContext = async (
    schemaStr,
    config
  ) => {
    // Setup graphback
    schemaStr = directives + '\n' + schemaStr
    const schema = buildSchema(schemaStr)
    
    const metadata = new GraphbackCoreMetadata(schema)

    const schemaGenerator = new SchemaCRUDPlugin()
    const schemaTransformed = schemaGenerator.transformSchema(metadata)
    fs.writeFileSync(
      'test.graphql',
      printSchemaWithDirectives(schemaTransformed)
    )

    const providers = {}
    const models = metadata.getModelDefinitions()
    for (const model of models) {
      providers[model.graphqlType.name] = new RedisGraphProvider(model)
    }

    // if seed data is supplied, insert it into collections
    if (config?.seedData) {
      const collectionNames = Object.keys(config.seedData)
      for (const collectionName of collectionNames) {
        for (const element of config.seedData[collectionName]) {
          await providers[collectionName].create(element)
        }
      }
    }

    return { providers }
  }
}

export default async () => {
  await run()
  return { createTestingContext, redis }
}
