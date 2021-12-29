import { GraphbackPluginEngine, printSchemaWithDirectives, createCRUDService } from '@graphback/core';
import { SchemaCRUDPlugin, SCHEMA_CRUD_PLUGIN_NAME } from '@graphback/codegen-schema';
import { mergeSchemas } from '@graphql-tools/merge';
import { PubSub } from 'graphql-subscriptions';
function createServices(models, createService, createProvider) {
    const services = {};
    for (const model of models) {
        const modelType = model.graphqlType;
        const modelProvider = createProvider(model);
        const modelService = createService(model, modelProvider);
        services[modelType.name] = modelService;
    }
    return services;
}
function getPlugins(plugins) {
    plugins = (plugins != null) || [];
    const pluginsMap = plugins.reduce((acc, plugin) => {
        if (acc[plugin.getPluginName()]) {
            // eslint-disable-next-line no-console
            console.debug(`Plugin ${plugin.getPluginName()} is already defined and will be overridden`);
        }
        acc[plugin.getPluginName()] = plugin;
        return acc;
    }, {});
    let schemaPlugin;
    if (pluginsMap[SCHEMA_CRUD_PLUGIN_NAME]) {
        schemaPlugin = pluginsMap[SCHEMA_CRUD_PLUGIN_NAME];
        /* eslint-disable-next-line */
        delete pluginsMap[SCHEMA_CRUD_PLUGIN_NAME]; // remove the crud schema plugin as it will be added as first entry.
    }
    return [
        schemaPlugin || new SchemaCRUDPlugin(),
        ...Object.values(pluginsMap)
    ];
}
/**
 * Creates all of the components needed for the GraphQL server - resolvers, schema and services.
 *
 * @param {GraphQLSchema|string} model - Data model as a string or GraphQL schema. Used to generate the Graphback API resolvers, services and database
 * @param {GraphbackAPIConfig} config
 * @param {GraphbackServiceCreator} [config.serviceCreator] - Creator class specifying which default CRUD service should be created for each model.
 * @param {GraphbackDataProviderCreator} config.dataProviderCreator - Creator class specifying which default database provider should be created for each model.
 * @param {GraphbackCRUDGeneratorConfig} [config.crud] - Global CRUD configuration for the Graphback API.
 * @param {GraphbackPlugin[]} [config.plugins] - Schema plugins to perform automatic changes to the generated schema
 *
 * @returns {GraphbackAPI} Generated schema, CRUD resolvers and services
 */
export function buildGraphbackAPI(model, config) {
    const schemaPlugins = getPlugins(config.plugins);
    const pluginEngine = new GraphbackPluginEngine({
        schema: model,
        plugins: schemaPlugins,
        config: { crudMethods: config.crud }
    });
    const metadata = pluginEngine.createResources();
    const models = metadata.getModelDefinitions();
    // Set a default ServiceCreator in the event the config does not have one
    const serviceCreator = config.serviceCreator || createCRUDService({ pubSub: new PubSub() });
    const services = createServices(models, serviceCreator, config.dataProviderCreator);
    const contextCreator = (context) => {
        return {
            ...context,
            graphback: services
        };
    };
    const resolvers = metadata.getResolvers();
    // merge resolvers into schema to make it executable
    const schemaWithResolvers = mergeSchemas({ schemas: [metadata.getSchema()], resolvers });
    const typeDefs = printSchemaWithDirectives(schemaWithResolvers);
    return {
        schema: schemaWithResolvers,
        typeDefs,
        resolvers,
        services,
        contextCreator
    };
}
//# sourceMappingURL=buildGraphbackAPI.js.map