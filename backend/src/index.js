import express from 'express'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import expressPlayground from 'graphql-playground-middleware-express'
import loadListeners from './loadListeners.js'
import generateGQLClient from './generateGQLClient.js'
import generateGQLServer from './generateGQLServer.js'
import { packageDirectorySync } from 'pkg-dir'

const dir = packageDirectorySync()

const app = express()
app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }))
app.use('/svelte', express.static(dir + '/frontend/svelte-typescript-app/public'))

// make sure you have redis running on localhost:6379 or change process.env.REDIS_HOST and process.env.REDIS_PORT

const { contextCreator, resolvers, typeDefs} = generateGQLServer() 

const server = new ApolloServer({
  typeDefs,
  resolvers: [resolvers],
  context: contextCreator, 
})

await server.start()

const httpServer = http.createServer(app)
server.applyMiddleware({ app })

httpServer.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql')
})

loadListeners()
generateGQLClient()
