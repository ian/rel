"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAutoPrimaryKey = exports.getPrimaryKey = void 0;
const graphql_1 = require("graphql");
const graphql_metadata_1 = require("graphql-metadata");
/**
 * Returns the primary key field of a GraphQL object.
 * First looks for the existence of a `@id` field annotation,
 * otherwise tries to find an `id: ID` field.
 *
 * @param graphqlType
 */
function getPrimaryKey(graphqlType) {
    const fields = Object.values(graphqlType.getFields());
    const autoPrimaryKeyFromScalar = [];
    let primaryKey;
    let primariesCount = 0;
    for (const field of fields) {
        const hasIdMarker = graphql_metadata_1.parseMetadata("id", field);
        if (hasIdMarker) {
            primaryKey = field;
            primariesCount += 1;
        }
        else if (isAutoPrimaryKey(field)) {
            autoPrimaryKeyFromScalar.push(field);
        }
    }
    if (primariesCount > 1) {
        throw new Error(`${graphqlType.name} type should not have multiple '@id' annotations.`);
    }
    if (primaryKey) {
        return primaryKey;
    }
    if (autoPrimaryKeyFromScalar.length > 1) {
        throw new Error(`${graphqlType.name} type should not have two potential primary keys: "_id" and "id". Use '@id' annotations to indicate which one is to be used.`);
    }
    primaryKey = autoPrimaryKeyFromScalar.shift();
    if (!primaryKey) {
        throw new Error(`${graphqlType.name} type has no primary field.`);
    }
    return primaryKey;
}
exports.getPrimaryKey = getPrimaryKey;
/**
 * Check if a GraphQLField can be inferred as a primary key, specific for each database:
 * A field is a potential primary key if:
 * - is named "id" and has type "ID", auto increment primary key for relational database
 * - is named "_id" and has scalar type "GraphbackObectID", a BSON primary key for MongoDB
 * @param field
 */
function isAutoPrimaryKey(field) {
    const { type, name: fieldName } = field;
    const baseType = graphql_1.getNamedType(type);
    const name = baseType.name;
    return ((fieldName === 'id' && name === 'ID') || (fieldName === "_id" && name === "GraphbackObjectID")) && graphql_1.isScalarType(baseType);
}
exports.isAutoPrimaryKey = isAutoPrimaryKey;
//# sourceMappingURL=getPrimaryKey.js.map