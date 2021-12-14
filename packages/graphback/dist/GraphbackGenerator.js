"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphbackGenerator = void 0;
const core_1 = require("@graphback/core");
const loadPlugins_1 = require("./loadPlugins");
/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
class GraphbackGenerator {
    constructor(schema, config) {
        this.schema = schema;
        this.config = config;
    }
    /**
     * Create backend with all related resources
     */
    generateSourceCode() {
        const plugins = loadPlugins_1.loadPlugins(this.config.plugins);
        const pluginEngine = new core_1.GraphbackPluginEngine({
            schema: this.schema,
            plugins,
            config: { crudMethods: this.config.crud },
        });
        pluginEngine.createResources();
    }
}
exports.GraphbackGenerator = GraphbackGenerator;
//# sourceMappingURL=GraphbackGenerator.js.map