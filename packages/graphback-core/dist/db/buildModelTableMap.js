"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModelTableMap = exports.getColumnName = exports.getTableName = void 0;
const graphql_metadata_1 = require("graphql-metadata");
const defaultNameTransforms_1 = require("./defaultNameTransforms");
const getPrimaryKey_1 = require("./getPrimaryKey");
/**
 * Gets the datase column name for a GraphQL type.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
function getTableName(model) {
    let tableName = defaultNameTransforms_1.defaultTableNameTransform(model.name, 'to-db');
    const dbAnnotations = graphql_metadata_1.parseMetadata('db', model);
    if (dbAnnotations && dbAnnotations.name) {
        tableName = dbAnnotations.name;
    }
    return tableName;
}
exports.getTableName = getTableName;
/**
 * Gets the datase column name for a GraphQL field.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
function getColumnName(field) {
    let columnName = field.name;
    const dbAnnotations = graphql_metadata_1.parseMetadata('db', field);
    if (dbAnnotations && dbAnnotations.name) {
        columnName = dbAnnotations.name;
    }
    return columnName;
}
exports.getColumnName = getColumnName;
function mapFieldsToColumns(fieldMap) {
    return Object.values(fieldMap).reduce((obj, field) => {
        const columnName = getColumnName(field);
        if (field.name !== columnName) {
            obj[field.name] = columnName;
        }
        //TODO: Map relationship fields
        return obj;
    }, {});
}
/**
 * Builds a database mapping model of a GraphQLObject type.
 * @param model - The GraphQL object data model representation
 *
 * @returns {ModelTableMap} A model containing the table name, any field customisations and a mapping of the primary key field.
 */
const buildModelTableMap = (model) => {
    const primaryKeyField = getPrimaryKey_1.getPrimaryKey(model);
    const tableName = getTableName(model);
    const fieldMap = mapFieldsToColumns(model.getFields());
    return {
        idField: getColumnName(primaryKeyField),
        typeName: model.name,
        tableName,
        fieldMap
    };
};
exports.buildModelTableMap = buildModelTableMap;
//# sourceMappingURL=buildModelTableMap.js.map