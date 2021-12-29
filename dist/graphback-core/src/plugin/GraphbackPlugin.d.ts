import { GraphQLSchema } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { GraphbackCoreMetadata } from './GraphbackCoreMetadata';
/**
 * Graphback plugin interface
 * Plugins are base for every graphback generator and schema transformers.
 * See documentation for the complete list of the plugins.
 *
 * Plugins can:
 *
 * - Modify the schema
 * - Create resources like files, db tables etc.
 * - Perform some in memory operations based on configuration
 */
export declare abstract class GraphbackPlugin {
    /**
     * Performs transformation on the schema and returns target schema
     * Implementations should extend this method if they wish to apply some changes
     * to schema. Otherwise unchanged schema should be returned
     *
     * @param metadata - metadata object containing schema
     */
    transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema;
    /**
     * Create resources like files etc. for this plugin.
     * This method should write resouces to filesystem
     */
    createResources(metadata: GraphbackCoreMetadata): void;
    /**
     * Method to create in-memory resolvers which will be
     * added to a list of resolvers output by Graphback
     *
     * @param metadata - metadata object with model metadata
     */
    createResolvers(metadata: GraphbackCoreMetadata): IResolvers;
    protected logWarning(message: string): void;
    protected logError(message: string): void;
    /**
     * @returns Unique name of the plugin
     */
    abstract getPluginName(): string;
}
//# sourceMappingURL=GraphbackPlugin.d.ts.map