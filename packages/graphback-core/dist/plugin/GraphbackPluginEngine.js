"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphbackPluginEngine = void 0;
const graphql_1 = require("graphql");
const GraphbackCoreMetadata_1 = require("./GraphbackCoreMetadata");
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
class GraphbackPluginEngine {
    constructor({ schema, config, plugins }) {
        this.plugins = plugins || [];
        if (!schema) {
            throw new Error("Plugin engine requires schema");
        }
        let graphQLSchema;
        if (typeof schema === "string") {
            graphQLSchema = graphql_1.buildSchema(schema);
        }
        else {
            graphQLSchema = schema;
        }
        this.metadata = new GraphbackCoreMetadata_1.GraphbackCoreMetadata(config, graphQLSchema);
    }
    registerPlugin(...plugins) {
        this.plugins.push(...plugins);
    }
    /**
     * Allows the transformation of schema by applying transformation logic for each plugin
     * Creation of resolvers, which has to come after all the changes in schema have been applied
     * Saving of the transformed schema and related files
     */
    createResources() {
        if (this.plugins.length === 0) {
            console.warn("GraphbackEngine: No Graphback plugins registered");
        }
        this.createSchema();
        this.createResolvers();
        //Save schema and all files
        for (const plugin of this.plugins) {
            plugin.createResources(this.metadata);
        }
        return this.metadata;
    }
    createSchema() {
        //We need to apply all required changes to the schema we need
        //This is to ensure that every plugin can add changes to the schema
        for (const plugin of this.plugins) {
            const newSchema = plugin.transformSchema(this.metadata);
            this.metadata.setSchema(newSchema);
        }
    }
    createResolvers() {
        for (const plugin of this.plugins) {
            const resolvers = plugin.createResolvers(this.metadata);
            this.metadata.addResolvers(resolvers);
        }
    }
}
exports.GraphbackPluginEngine = GraphbackPluginEngine;
//# sourceMappingURL=GraphbackPluginEngine.js.map