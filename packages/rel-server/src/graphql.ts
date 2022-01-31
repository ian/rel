import { formatSdl } from 'format-graphql'
import { renderPlaygroundPage } from 'graphql-playground-html'

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Mercurius, { MercuriusError } from 'mercurius'
// import AltairFastify from 'altair-fastify-plugin'
// import goTrace from '@go-trace/tracer'

import Graphback from './graphback'

// ////////////////////////
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
// ////////////////////////

export default async function GraphQLPlugin(
  app: FastifyInstance,
  opts: Opts
): Promise<void> {
  const { schema: baseSchema, outputPath, logger } = opts

  const graphback = await Graphback({
    schema: baseSchema,
    outputPath,
    logger,
  })

  const { schema, resolvers, contextCreator } = graphback

  app.register(Mercurius, {
    path: "/graphql",
    schema: schema,
    resolvers: pruneResultListsForNow(resolvers),
    context: (req, reply) => {
      return {
        req,
        reply,
        ...contextCreator(req,reply)
      }
    },
    errorHandler: (error: MercuriusError, request: FastifyRequest, reply: FastifyReply) => {
      console.error(error)
      reply.status(500).send({ message: error.message })
    }
  })

  if (process.env.GRAPHQL_LOGGING) {
    app.ready().then(() => {
      app.graphql.addHook('onResolution', async function (execution, context) {
        const { query, variables } = context.reply.request.body as {
          query: string
          variables: object
        }
        
        // if (query.match("query IntrospectionQuery")) return

        // @todo - i'd like to stick this into some logging solution
        console.log(formatSdl(query))
        console.log(JSON.stringify(variables, null, 2))
        // console.log(JSON.stringify(execution, null, 2))
        console.log()
      })
    })
  }

  if (process.env.REL_TRACE) {
    logger.info('Tracer enabled at http://localhost:2929', 'INIT')
  }

  // GraphQL Playground
  app.get('/', async (_, reply) => {
    reply.headers({
      'Content-Type': 'text/html',
    })

    reply.send(
      renderPlaygroundPage({
        endpoint: `/graphql`,
      })
    )
    reply.status(200)
  })

  // app.register(AltairFastify, {
  //   /**
  //    * All these are the defaults.
  //    */
  //   path: '/altair',
  //   baseURL: '/altair/',
  //   endpointURL: '/graphql',
  //   // decorateReply: false,
  // })
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
