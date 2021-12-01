import express from 'express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { buildGraphbackAPI } from 'graphback'
import { createRedisGraphProvider } from 'runtime-redisgraph'
import expressPlayground from 'graphql-playground-middleware-express'
import { SchemaCRUDPlugin } from '@graphback/codegen-schema'

const app = express()
app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))

const schema = `
"""@model"""
type Note {
  id: ID!
  text: String!
  archived: Boolean!
} 
`

// make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT

const dataProviderCreator = createRedisGraphProvider()

const { typeDefs, resolvers, contextCreator } = buildGraphbackAPI(schema, {
  dataProviderCreator,
  plugins: [
    new SchemaCRUDPlugin({
      outputPath: './schema/schema.graphql',
    }),
  ],
})

const server = new ApolloServer({
  typeDefs,
  resolvers: [resolvers],
  context: contextCreator,
})

await server.start()

const httpServer = http.createServer(app)
server.applyMiddleware({ app })

await httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql')
})
