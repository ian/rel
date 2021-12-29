import { GraphbackPluginEngine } from '@graphback/core';
import { loadPlugins } from './loadPlugins';
/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export class GraphbackGenerator {
    config;
    schema;
    constructor(schema, config) {
        this.schema = schema;
        this.config = config;
    }
    /**
     * Create backend with all related resources
     */
    generateSourceCode() {
        const plugins = loadPlugins(this.config.plugins);
        const pluginEngine = new GraphbackPluginEngine({
            schema: this.schema,
            plugins,
            config: { crudMethods: this.config.crud }
        });
        pluginEngine.createResources();
    }
}
//# sourceMappingURL=GraphbackGenerator.js.map