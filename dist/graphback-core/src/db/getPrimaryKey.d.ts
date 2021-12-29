import { GraphQLField, GraphQLObjectType, GraphQLInputField } from 'graphql';
/**
 * Returns the primary key field of a GraphQL object.
 * First looks for the existence of a `@id` field annotation,
 * otherwise tries to find an `id: ID` field.
 *
 * @param graphqlType
 */
export declare function getPrimaryKey(graphqlType: GraphQLObjectType): GraphQLField<any, any>;
/**
 * Check if a GraphQLField can be inferred as a primary key, specific for each database:
 * A field is a potential primary key if:
 * - is named "id" and has type "ID", auto increment primary key for relational database
 * - is named "_id" and has scalar type "GraphbackObectID", a BSON primary key for MongoDB
 * @param field
 */
export declare function isAutoPrimaryKey(field: GraphQLField<any, any> | GraphQLInputField): boolean;
//# sourceMappingURL=getPrimaryKey.d.ts.map