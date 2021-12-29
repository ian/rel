import { parseMetadata } from 'graphql-metadata';
import { defaultTableNameTransform } from './defaultNameTransforms';
import { getPrimaryKey } from './getPrimaryKey';
/**
 * Gets the datase column name for a GraphQL type.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export function getTableName(model) {
    let tableName = defaultTableNameTransform(model.name, 'to-db');
    const dbAnnotations = parseMetadata('db', model);
    if (dbAnnotations && dbAnnotations.name) {
        tableName = dbAnnotations.name;
    }
    return tableName;
}
/**
 * Gets the datase column name for a GraphQL field.
 * Checks for the `@db(name)` annotation for a customised name
 *
 * @param field
 */
export function getColumnName(field) {
    let columnName = field.name;
    const dbAnnotations = parseMetadata('db', field);
    if (dbAnnotations && dbAnnotations.name) {
        columnName = dbAnnotations.name;
    }
    return columnName;
}
function mapFieldsToColumns(fieldMap) {
    return Object.values(fieldMap).reduce((obj, field) => {
        const columnName = getColumnName(field);
        if (field.name !== columnName) {
            obj[field.name] = columnName;
        }
        // TODO: Map relationship fields
        return obj;
    }, {});
}
/**
 * Builds a database mapping model of a GraphQLObject type.
 * @param model - The GraphQL object data model representation
 *
 * @returns {ModelTableMap} A model containing the table name, any field customisations and a mapping of the primary key field.
 */
export const buildModelTableMap = (model) => {
    const primaryKeyField = getPrimaryKey(model);
    const tableName = getTableName(model);
    const fieldMap = mapFieldsToColumns(model.getFields());
    return {
        idField: getColumnName(primaryKeyField),
        typeName: model.name,
        tableName,
        fieldMap
    };
};
//# sourceMappingURL=buildModelTableMap.js.map