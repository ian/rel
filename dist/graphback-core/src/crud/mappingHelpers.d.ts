import { GraphQLObjectType, GraphQLSchema, GraphQLField } from 'graphql';
import { GraphbackOperationType } from './GraphbackOperationType';
/**
 * Graphback CRUD Mapping helpers
 */
export declare function lowerCaseFirstChar(text: string): string;
export declare function upperCaseFirstChar(text: string): string;
/**
 * Get name of the field for query and mutation using our crud model.
 * Method trasform specific CRUD operation into compatible name
 *
 * Example:
 * ```
 * type Query {
 *   getUser()
 * }
 * ```
 * This method is compatible with Graphback CRUD specification
 *
 * @param typeName
 * @param action
 */
export declare const getFieldName: (typeName: string, action: GraphbackOperationType) => string;
/**
 * Returns the input type assocatiated with a CRUD operation
 * @param typeName
 * @param action
 */
export declare const getInputTypeName: (typeName: string, action: GraphbackOperationType) => string;
/**
 * Provides naming patterns for CRUD subscriptions
 */
export declare const getSubscriptionName: (typeName: string, action: GraphbackOperationType) => string;
export declare function isModelType(graphqlType: GraphQLObjectType): boolean;
/**
 * Get only user types annotated by ```@model```
 *
 * @param schema
 */
export declare function filterModelTypes(schema: GraphQLSchema): GraphQLObjectType[];
/**
 * Get only user types not annotated by ```@model```
 *
 * @param schema
 */
export declare function filterNonModelTypes(schema: GraphQLSchema): GraphQLObjectType[];
export declare function getUserModels(modelTypes: GraphQLObjectType[]): GraphQLObjectType[];
export declare function isInputField(field: GraphQLField<any, any>): boolean;
export declare function getRelationFieldName(field: any, type: any): string;
export declare function getInputFieldName(field: GraphQLField<any, any>): string;
export declare function getInputFieldTypeName(modelName: string, field: GraphQLField<any, any>, operation: GraphbackOperationType): string;
//# sourceMappingURL=mappingHelpers.d.ts.map