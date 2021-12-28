"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputFieldTypeName = exports.getInputFieldName = exports.getRelationFieldName = exports.isInputField = exports.getUserModels = exports.filterNonModelTypes = exports.filterModelTypes = exports.isModelType = exports.getSubscriptionName = exports.getInputTypeName = exports.getFieldName = exports.upperCaseFirstChar = exports.lowerCaseFirstChar = void 0;
const graphql_1 = require("graphql");
const graphql_metadata_1 = require("graphql-metadata");
const pluralize = require("pluralize");
const utils_1 = require("@graphql-tools/utils");
const __1 = require("..");
const GraphbackOperationType_1 = require("./GraphbackOperationType");
//TODO it is esential to document this element
/**
 * Graphback CRUD Mapping helpers
 */
function lowerCaseFirstChar(text) {
    return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
exports.lowerCaseFirstChar = lowerCaseFirstChar;
function upperCaseFirstChar(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
exports.upperCaseFirstChar = upperCaseFirstChar;
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
const getFieldName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    switch (action) {
        case GraphbackOperationType_1.GraphbackOperationType.FIND_ONE:
            return `get${finalName}`;
        case GraphbackOperationType_1.GraphbackOperationType.FIND:
            return `find${pluralize(finalName)}`;
        case GraphbackOperationType_1.GraphbackOperationType.DELETE_BY:
            return `delete${pluralize(finalName)}`;
        case GraphbackOperationType_1.GraphbackOperationType.UPDATE_BY:
            return `update${pluralize(finalName)}`;
        default:
            return `${action}${finalName}`;
    }
};
exports.getFieldName = getFieldName;
/**
 * Returns the input type assocatiated with a CRUD operation
 * @param typeName
 * @param action
 */
const getInputTypeName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    switch (action) {
        case GraphbackOperationType_1.GraphbackOperationType.FIND:
            return `${finalName}Filter`;
        case GraphbackOperationType_1.GraphbackOperationType.CREATE:
            return `Create${finalName}Input`;
        case GraphbackOperationType_1.GraphbackOperationType.UPDATE:
        case GraphbackOperationType_1.GraphbackOperationType.DELETE:
        case GraphbackOperationType_1.GraphbackOperationType.UPDATE_BY:
        case GraphbackOperationType_1.GraphbackOperationType.DELETE_BY:
            return `Mutate${finalName}Input`;
        case GraphbackOperationType_1.GraphbackOperationType.SUBSCRIPTION_CREATE:
        case GraphbackOperationType_1.GraphbackOperationType.SUBSCRIPTION_UPDATE:
        case GraphbackOperationType_1.GraphbackOperationType.SUBSCRIPTION_DELETE:
            return `${finalName}SubscriptionFilter`;
        default:
            return '';
    }
};
exports.getInputTypeName = getInputTypeName;
/**
 * Provides naming patterns for CRUD subscriptions
 */
const getSubscriptionName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    if (action === GraphbackOperationType_1.GraphbackOperationType.CREATE) {
        return `new${finalName}`;
    }
    if (action === GraphbackOperationType_1.GraphbackOperationType.UPDATE) {
        return `updated${finalName}`;
    }
    if (action === GraphbackOperationType_1.GraphbackOperationType.DELETE) {
        return `deleted${finalName}`;
    }
    return "";
};
exports.getSubscriptionName = getSubscriptionName;
function isModelType(graphqlType) {
    return !!graphql_metadata_1.parseMetadata('model', graphqlType.description);
}
exports.isModelType = isModelType;
/**
 * Get only user types annotated by ```@model```
 *
 * @param schema
 */
function filterModelTypes(schema) {
    return utils_1.getUserTypesFromSchema(schema).filter(isModelType);
}
exports.filterModelTypes = filterModelTypes;
/**
 * Get only user types not annotated by ```@model```
 *
 * @param schema
 */
function filterNonModelTypes(schema) {
    return utils_1.getUserTypesFromSchema(schema).filter((t) => !isModelType(t));
}
exports.filterNonModelTypes = filterNonModelTypes;
function getUserModels(modelTypes) {
    return modelTypes.filter(isModelType);
}
exports.getUserModels = getUserModels;
function isInputField(field) {
    const relationshipAnnotation = __1.parseRelationshipAnnotation(field.description);
    return !relationshipAnnotation || relationshipAnnotation.kind !== 'oneToMany';
}
exports.isInputField = isInputField;
//tslint:disable-next-line: no-reserved-keywords
function getRelationFieldName(field, type) {
    let fieldName;
    if (field.annotations.OneToOne) {
        fieldName = field.annotations.OneToOne.field;
    }
    else if (field.annotations.ManyToOne) {
        fieldName = field.annotations.ManyToOne.field;
    }
    else if (field.annotations.OneToMany) {
        fieldName = field.annotations.OneToMany.field;
    }
    else {
        fieldName = type.name;
    }
    return fieldName;
}
exports.getRelationFieldName = getRelationFieldName;
function getInputFieldName(field) {
    const relationshipAnnotation = __1.parseRelationshipAnnotation(field.description);
    if (!relationshipAnnotation) {
        return field.name;
    }
    if (relationshipAnnotation.kind === 'oneToMany') {
        throw new Error('Not inputtable field!');
    }
    return relationshipAnnotation.key || __1.transformForeignKeyName(field.name);
}
exports.getInputFieldName = getInputFieldName;
function getInputFieldTypeName(modelName, field, operation) {
    const fieldType = graphql_1.getNamedType(field.type);
    if (graphql_1.isObjectType(fieldType) && isModelType(fieldType)) {
        const relationshipAnnotation = __1.parseRelationshipAnnotation(field.description);
        if (!relationshipAnnotation) {
            throw new Error(`Missing relationship definition on: "${modelName}.${field.name}". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
        }
        const idField = __1.getPrimaryKey(fieldType);
        return graphql_1.getNamedType(idField.type).name;
    }
    if (graphql_1.isScalarType(fieldType) || graphql_1.isEnumType(fieldType)) {
        return fieldType.name;
    }
    if (graphql_1.isObjectType(fieldType) && !isModelType(fieldType)) {
        // TODO: Filtering on JSON fields
        if (operation === GraphbackOperationType_1.GraphbackOperationType.FIND) {
            return undefined;
            // return GraphQLJSON
        }
        return exports.getInputTypeName(fieldType.name, operation);
    }
    return undefined;
}
exports.getInputFieldTypeName = getInputFieldTypeName;
//# sourceMappingURL=mappingHelpers.js.map