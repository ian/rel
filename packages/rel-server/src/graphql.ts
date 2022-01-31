// import { createServer } from 'graphql-yoga'
import { formatSdl } from 'format-graphql'

import { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
// import goTrace from '@go-trace/tracer'

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

  const { schema, resolvers, services } = await Graphback({
    schema: baseSchema,
    outputPath,
    logger,
  })

  app.register(mercurius, {
    schema,
    resolvers: pruneResultListsForNow(resolvers),
    context: (request, reply) => {
      // Return an object that will be available in your GraphQL resolvers
      return {
        graphback: services
      }
    }
  })

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  if (process.env.GRAPHQL_LOGGING) {
    app.ready().then(() => {
      app.graphql.addHook(
        "onResolution",
        async function (execution, context) {
          const { query, variables } = context.reply.request.body as {
            query: string
            variables: object
          }

          if (query.match("query IntrospectionQuery")) return

          // @todo - i'd like to stick this into some logging solution
          console.log(formatSdl(query))
          console.log(JSON.stringify(variables, null, 2))
          // console.log(JSON.stringify(execution, null, 2))
          console.log()
        }
      )
    })
  }

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
