import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { ModelDefinition } from './ModelDefinition';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
/**
 * Contains Graphback Core Models
 */
export declare class GraphbackCoreMetadata {
    private readonly supportedCrudMethods;
    private schema;
    private resolvers;
    private models;
    constructor(globalConfig: GraphbackGlobalConfig, schema: GraphQLSchema);
    getSchema(): GraphQLSchema;
    setSchema(newSchema: GraphQLSchema): void;
    addResolvers(resolvers: IResolvers): void;
    getResolvers(): IResolvers;
    /**
     * Get Graphback Models - GraphQL Types with additional CRUD configuration
     */
    getModelDefinitions(): ModelDefinition[];
    /**
     * Helper for plugins to fetch all types that should be processed by Graphback plugins.
     * To mark type as enabled for graphback generators we need to add `model` annotations over the type.
     *
     * Returns all user types that have @model in description
     * @param schema
     */
    getGraphQLTypesWithModel(): GraphQLObjectType[];
    private buildModel;
}
//# sourceMappingURL=GraphbackCoreMetadata.d.ts.map