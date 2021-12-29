import { GraphQLResolveInfo } from 'graphql';
import { ModelDefinition } from './ModelDefinition';
/**
 * Find selectable fields from resolve info for a given model starting on a given path
 * @param info - the resolver info object
 * @param model - the model to find the fields from
 * @param path - the root path to start field resolution from.
 */
export declare const getSelectedFieldsFromResolverInfo: (info: GraphQLResolveInfo, model: ModelDefinition, path?: string | undefined) => string[];
/**
 * Get the model specific-fields from a full list of fields
 *
 * @param {string[]} resolverFields - resolver field names
 * @param {ModelDefinition} model - Graphback model
 */
export declare const getModelFieldsFromResolverFields: (resolverFields: string[], model: ModelDefinition) => string[];
/**
 * Find fields list of resolver info starting at a given path.
 * If path is undefined, return top level fields information.
 * @param info - the resolver info object
 * @param path - the root path to start field resolution from
 */
export declare const getResolverInfoFieldsList: (info: GraphQLResolveInfo, path?: string | undefined) => string[];
//# sourceMappingURL=getSelectedFieldsFromResolverInfo.d.ts.map