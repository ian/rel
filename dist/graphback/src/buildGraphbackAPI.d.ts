import { GraphQLSchema } from 'graphql';
import { ServiceCreator, DataProviderCreator, GraphbackPlugin, GraphbackCRUDGeneratorConfig, ModelDefinition, GraphbackServiceConfigMap, GraphbackContext, GraphbackDataProvider, GraphbackCRUDService } from '@graphback/core';
export interface GraphbackAPIConfig {
    /**
     * Global CRUD configuration
     */
    crud?: GraphbackCRUDGeneratorConfig;
    /**
     * Schema plugins to perform automatic changes to the schema
     */
    plugins?: GraphbackPlugin[];
    /**
     * Function which creates a default CRUD Service for every data model
     */
    serviceCreator?: ServiceCreator;
    /**
     * Function which creates a default data provicer for every data model
     */
    dataProviderCreator: DataProviderCreator;
}
/**
 * Defines the individual components created in the Graphback API
 */
export interface GraphbackAPI {
    /**
     * GraphQL schema as a string
     */
    typeDefs: string;
    /**
     * GraphQL schema object
     */
    schema: GraphQLSchema;
    /**
     * CRUD resolvers for every data model
     */
    resolvers: Record<string, any>;
    /**
     * Model:Service map of CRUD services for every data model
     */
    services: GraphbackServiceConfigMap;
    /**
     * Creates context to be attached to the running server
     */
    contextCreator: (context?: any) => GraphbackContext;
}
export declare type GraphbackServiceCreator = (model: ModelDefinition, dataProvider: GraphbackDataProvider) => GraphbackCRUDService;
export declare type GraphbackDataProviderCreator = (model: ModelDefinition) => GraphbackDataProvider;
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
export declare function buildGraphbackAPI(model: string | GraphQLSchema, config: GraphbackAPIConfig): GraphbackAPI;
//# sourceMappingURL=buildGraphbackAPI.d.ts.map