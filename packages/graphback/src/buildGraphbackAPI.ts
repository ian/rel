import { GraphQLSchema } from 'graphql'
import { formatSdl } from 'format-graphql'
import {
  ServiceCreator,
  DataProviderCreator,
  GraphbackPlugin,
  GraphbackPluginEngine,
  printSchemaWithDirectives,
  ModelDefinition,
  GraphbackServiceConfigMap,
  GraphbackContext,
  createCRUDService,
  GraphbackDataProvider,
  GraphbackCRUDService,
} from '@graphback/core'
import {
  SchemaCRUDPlugin,
  SCHEMA_CRUD_PLUGIN_NAME,
} from '@graphback/codegen-schema'
import { mergeSchemas } from '@graphql-tools/merge'
import { PubSub } from 'graphql-subscriptions'
import { constraintDirective } from 'graphql-constraint-directive'

export interface GraphbackAPIConfig {
  /**
   * Schema plugins to perform automatic changes to the schema
   */
  plugins?: GraphbackPlugin[]

  /**
   * Function which creates a default CRUD Service for every data model
   */
  serviceCreator?: ServiceCreator

  /**
   * Function which creates a default data provicer for every data model
   */
  dataProviderCreator: DataProviderCreator
}

/**
 * Defines the individual components created in the Graphback API
 */
export interface GraphbackAPI {
  /**
   * GraphQL schema as a string
   */
  typeDefs: string
  /**
   * GraphQL schema object
   */
  schema: GraphQLSchema
  /**
   * CRUD resolvers for every data model
   */
  resolvers: Record<string, any>
  /**
   * Model:Service map of CRUD services for every data model
   */
  services: GraphbackServiceConfigMap

  /**
   * Creates context to be attached to the running server
   */
  contextCreator: (context?: any) => GraphbackContext
}

export type GraphbackServiceCreator = (
  model: ModelDefinition,
  dataProvider: GraphbackDataProvider
) => GraphbackCRUDService
export type GraphbackDataProviderCreator = (
  model: ModelDefinition
) => GraphbackDataProvider

async function createServices(
  models: ModelDefinition[],
  createService: Promise<GraphbackServiceCreator>,
  createProvider: GraphbackDataProviderCreator
) {
  const services: GraphbackServiceConfigMap = {}

  for (const model of models) {
    const modelType = model.graphqlType
    const modelProvider = createProvider(model)
    const modelService = await createService(model, modelProvider)
    services[modelType.name] = modelService
  }

  return services
}

interface PluginMap {
  [name: string]: GraphbackPlugin
}

function getPlugins(plugins?: GraphbackPlugin[]): GraphbackPlugin[] {
  const pluginsMap: PluginMap =
    plugins?.reduce((acc: PluginMap, plugin: GraphbackPlugin) => {
      if (acc[plugin.getPluginName()]) {
        // eslint-disable-next-line no-console
        console.debug(
          `Plugin ${plugin.getPluginName()} is already defined and will be overridden`
        )
      }

      acc[plugin.getPluginName()] = plugin

      return acc
    }, {}) || {}

  let schemaPlugin: GraphbackPlugin

  if (pluginsMap[SCHEMA_CRUD_PLUGIN_NAME]) {
    schemaPlugin = pluginsMap[SCHEMA_CRUD_PLUGIN_NAME]
    /* eslint-disable-next-line */
    delete pluginsMap[SCHEMA_CRUD_PLUGIN_NAME] // remove the crud schema plugin as it will be added as first entry.
  }

  return [schemaPlugin || new SchemaCRUDPlugin(), ...Object.values(pluginsMap)]
}

/**
 * Creates all of the components needed for the GraphQL server - resolvers, schema and services.
 *
 * @param {GraphQLSchema|string} model - Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database
 * @param {GraphbackAPIConfig} config
 * @param {GraphbackServiceCreator} [config.serviceCreator] - Creator class specifying which default CRUD service should be created for each model.
 * @param {GraphbackDataProviderCreator} config.dataProviderCreator - Creator class specifying which default database provider should be created for each model.
 * @param {GraphbackPlugin[]} [config.plugins] - Schema plugins to perform automatic changes to the generated schema
 *
 * @returns {GraphbackAPI} Generated schema, CRUD resolvers and services
 */
export async function buildGraphbackAPI(
  model: string | GraphQLSchema,
  config = {}
): GraphbackAPI {
  const schemaPlugins: GraphbackPlugin[] = getPlugins(config.plugins)

  const pluginEngine = new GraphbackPluginEngine({
    schema: model,
    plugins: schemaPlugins,
  })

  const metadata = pluginEngine.createResources()
  const models = metadata.getModelDefinitions()

  // Set a default ServiceCreator in the event the config does not have one
  const serviceCreator =
    config.serviceCreator || createCRUDService({ pubSub: new PubSub() })

  const services = await createServices(
    models,
    serviceCreator,
    config.dataProviderCreator
  )
  const contextCreator = (context: any) => {
    return {
      ...context,
      graphback: services,
    }
  }

  const resolvers = metadata.getResolvers()

  const schema = constraintDirective()(metadata.getSchema())
  // merge resolvers into schema to make it executable
  const schemaWithResolvers = mergeSchemas({ schemas: [schema], resolvers })

  const typeDefs = formatSdl(printSchemaWithDirectives(schemaWithResolvers))

  return {
    schema: schemaWithResolvers,
    typeDefs,
    resolvers,
    services,
    contextCreator,
  }
}
