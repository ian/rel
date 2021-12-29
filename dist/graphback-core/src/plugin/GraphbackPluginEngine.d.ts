import { GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
import { GraphbackGlobalConfig } from './GraphbackGlobalConfig';
import { GraphbackPlugin } from './GraphbackPlugin';
/**
 * options for the GraphbackPluginEngine
 */
export interface GraphBackPluginEngineOptions {
    schema: GraphQLSchema | string;
    config?: GraphbackGlobalConfig;
    plugins?: GraphbackPlugin[];
}
/**
 * Allows to execute chain of plugins that create resources.
 * Common use case is to decorate GraphQL schema with additional
 * actions and generate files like resolvers and database access logic
 *
 * Usage:
 * ```js
 * const engine = GraphbackPluginEngine({ schema });
 * engine.registerPlugin(plugin);
 * printSchema(engine.createResources());
 * ```
 */
export declare class GraphbackPluginEngine {
    private readonly plugins;
    private readonly metadata;
    constructor({ schema, config, plugins }: GraphBackPluginEngineOptions);
    registerPlugin(...plugins: GraphbackPlugin[]): void;
    /**
     * Allows the transformation of schema by applying transformation logic for each plugin
     * Creation of resolvers, which has to come after all the changes in schema have been applied
     * Saving of the transformed schema and related files
     */
    createResources(): GraphbackCoreMetadata;
    private createSchema;
    private createResolvers;
}
//# sourceMappingURL=GraphbackPluginEngine.d.ts.map