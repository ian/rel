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
export class GraphbackPlugin {
    /**
     * Performs transformation on the schema and returns target schema
     * Implementations should extend this method if they wish to apply some changes
     * to schema. Otherwise unchanged schema should be returned
     *
     * @param metadata - metadata object containing schema
     */
    transformSchema(metadata) {
        return metadata.getSchema();
    }
    /**
     * Create resources like files etc. for this plugin.
     * This method should write resouces to filesystem
     */
    createResources(metadata) {
        return undefined;
    }
    /**
     * Method to create in-memory resolvers which will be
     * added to a list of resolvers output by Graphback
     *
     * @param metadata - metadata object with model metadata
     */
    createResolvers(metadata) {
        return undefined;
    }
    logWarning(message) {
        // eslint-disable-next-line no-console
        console.log(`Warning - ${this.getPluginName()}: ${message}`);
    }
    logError(message) {
        // eslint-disable-next-line no-console
        console.error(`Error - ${this.getPluginName()}: ${message}`);
    }
}
;
//# sourceMappingURL=GraphbackPlugin.js.map