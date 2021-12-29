import { GraphQLSchema } from 'graphql';
import { GraphbackConfig } from './GraphbackConfig';
/**
 * GraphbackGenerator
 *
 * Automatically generate your database structure resolvers and queries from graphql types.
 * See README for examples
 */
export declare class GraphbackGenerator {
    protected config: GraphbackConfig;
    protected schema: string | GraphQLSchema;
    constructor(schema: GraphQLSchema | string, config: GraphbackConfig);
    /**
     * Create backend with all related resources
     */
    generateSourceCode(): void;
}
//# sourceMappingURL=GraphbackGenerator.d.ts.map