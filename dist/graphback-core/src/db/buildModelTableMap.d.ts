import { GraphQLField, GraphQLObjectType } from 'graphql';
/**
 * Contains mapping information between GraphQL Model type and database table
 *
 * - typeName: Original GraphQLObjectType name
 * - tableName: Name of datase table
 * - id: Indicates the primary key field
 * - fieldMap: Object of key-value mapping between GraphQL fields and database columns.
 */
export interface ModelTableMap {
    typeName: string;
    tableName: string;
    idField: string;
    fieldMap?: {
        [key: string]: string;
    };
}
/**
 * Gets the datase column name for a GraphQL type.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export declare function getTableName(model: GraphQLObjectType): string;
/**
 * Gets the datase column name for a GraphQL field.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export declare function getColumnName(field: GraphQLField<any, any>): string;
/**
 * Builds a database mapping model of a GraphQLObject type.
 * @param model - The GraphQL object data model representation
 *
 * @returns {ModelTableMap} A model containing the table name, any field customisations and a mapping of the primary key field.
 */
export declare const buildModelTableMap: (model: GraphQLObjectType) => ModelTableMap;
//# sourceMappingURL=buildModelTableMap.d.ts.map