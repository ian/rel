import { createServer } from 'graphql-yoga'

import { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
// import goTrace from '@go-trace/tracer'
// import { GraphQLSchema, printSchema } from 'graphql'

import Graphback from './graphback'

// ////////////////////////
// move me
import Logger from '@ptkdev/logger'

type Opts = {
  // schema: GraphQLSchema
  // resolvers: object
  // contextCreator: any // what is this?
  schema: string
  outputPath: string
  logger: Logger
}
// ////////////////////////

export default async function GraphQLPlugin(
  app: FastifyInstance,
  opts: Opts
): Promise<void> {
  const { schema: baseSchema, outputPath, logger } = opts

  const { schema, resolvers, services, ...graphback } = await Graphback({
    schema: baseSchema,
    outputPath,
    logger,
  })

  // console.log({ graphback })

  app.register(mercurius, {
    schema,
    resolvers: pruneResultListsForNow(resolvers),
    context: (request, reply) => {
      // Return an object that will be available in your GraphQL resolvers
      return {
        graphback: services
      }
    }
    // context: {
    //   graphback
    // }
    // // subscription: {
    // //   emitter,
    // // },
  })

  // const graphQLServer = createServer({
  //   // schema,
  //   // context: contextCreator,
  //   ...graphback,
  //   enableLogging: false,
  // })

  // app.route({
  //   url: '/graphql',
  //   method: ['GET', 'POST', 'OPTIONS'],
  //   handler: async (req, reply) => {
  //     // let response
  //     // if (process.env.REL_TRACE && req.headers.accept !== 'text/event-stream') {
  //     //   const hasQuery = Object.keys(req.query).length > 0
  //     //   response = await goTrace(
  //     //     schema,
  //     //     // @ts-ignore
  //     //     hasQuery ? req.query.query : req.body.query,
  //     //     null,
  //     //     contextCreator(),
  //     //     // @ts-ignore
  //     //     hasQuery ? JSON.parse(req.query.variables) : req.body.variables
  //     //   )
  //     //   reply.status(200)
  //     //   reply.send(response)
  //     // } else {

  //     const response = await graphQLServer.handleIncomingMessage(req)

  //     console.log(req.body)
  //     console.log(response.body, response.status)

  //     response.headers.forEach((value, key) => {
  //       reply.header(key, value)
  //     })
  //     reply.status(response.status)
  //     reply.send(response.body)
  //     // }
  //   },
  // })

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  // if (process.env.GRAPHQL_LOGGING) {
  //   app.graphql.addHook('onResolution', async function (execution, context) {
  //     // console.log('onResolution called', context.reply.raw, context.reply.request)
  //     const { query, variables } = context.reply.request.body as {
  //       query: string
  //       variables: any
  //     }

  //     // if (query.match('query IntrospectionQuery')) return

  //     console.log()
  //     console.log(query.trim())
  //     console.log(JSON.stringify(variables, null, 2))
  //     console.log(JSON.stringify(execution, null, 2))
  //     console.log()
  //   })
  // }

  // console.log(printSchema(schema))

  app.register(AltairFastify, {
    /**
     * All these are the defaults.
     */
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    // decorateReply: false,
  })
}

function pruneResultListsForNow(resolvers) {
  const prune = (obj) => {
    return Object.entries(obj).reduce((acc, entry) => {
      const [key, value] = entry
      if (!key.match(/Result/)) acc[key] = value
      return acc
    }, {})
  }
  return {
    ...resolvers,
    Query: prune(resolvers.Query),
    Mutation: prune(resolvers.Mutation),
    Subscription: prune(resolvers.Subscription),
  }
}
