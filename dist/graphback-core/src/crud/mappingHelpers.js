import { getNamedType, isObjectType, isScalarType, isEnumType } from 'graphql';
import { parseMetadata } from 'graphql-metadata';
import pluralize from 'pluralize';
import { getUserTypesFromSchema } from '@graphql-tools/utils';
import { parseRelationshipAnnotation, transformForeignKeyName, getPrimaryKey } from '..';
import { GraphbackOperationType } from './GraphbackOperationType';
// TODO it is esential to document this element
/**
 * Graphback CRUD Mapping helpers
 */
export function lowerCaseFirstChar(text) {
    return `${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}
export function upperCaseFirstChar(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
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
export const getFieldName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    switch (action) {
        case GraphbackOperationType.FIND_ONE:
            return `get${finalName}`;
        case GraphbackOperationType.FIND:
            return `find${pluralize(finalName)}`;
        case GraphbackOperationType.DELETE_BY:
            return `delete${pluralize(finalName)}`;
        case GraphbackOperationType.UPDATE_BY:
            return `update${pluralize(finalName)}`;
        default:
            return `${action}${finalName}`;
    }
};
/**
 * Returns the input type assocatiated with a CRUD operation
 * @param typeName
 * @param action
 */
export const getInputTypeName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    switch (action) {
        case GraphbackOperationType.FIND:
            return `${finalName}Filter`;
        case GraphbackOperationType.CREATE:
            return `Create${finalName}Input`;
        case GraphbackOperationType.UPDATE:
        case GraphbackOperationType.DELETE:
        case GraphbackOperationType.UPDATE_BY:
        case GraphbackOperationType.DELETE_BY:
            return `Mutate${finalName}Input`;
        case GraphbackOperationType.SUBSCRIPTION_CREATE:
        case GraphbackOperationType.SUBSCRIPTION_UPDATE:
        case GraphbackOperationType.SUBSCRIPTION_DELETE:
            return `${finalName}SubscriptionFilter`;
        default:
            return '';
    }
};
/**
 * Provides naming patterns for CRUD subscriptions
 */
export const getSubscriptionName = (typeName, action) => {
    const finalName = upperCaseFirstChar(typeName);
    if (action === GraphbackOperationType.CREATE) {
        return `new${finalName}`;
    }
    if (action === GraphbackOperationType.UPDATE) {
        return `updated${finalName}`;
    }
    if (action === GraphbackOperationType.DELETE) {
        return `deleted${finalName}`;
    }
    return '';
};
export function isModelType(graphqlType) {
    return !!parseMetadata('model', graphqlType.description);
}
/**
 * Get only user types annotated by ```@model```
 *
 * @param schema
 */
export function filterModelTypes(schema) {
    return getUserTypesFromSchema(schema).filter(isModelType);
}
/**
 * Get only user types not annotated by ```@model```
 *
 * @param schema
 */
export function filterNonModelTypes(schema) {
    return getUserTypesFromSchema(schema).filter((t) => !isModelType(t));
}
export function getUserModels(modelTypes) {
    return modelTypes.filter(isModelType);
}
export function isInputField(field) {
    const relationshipAnnotation = parseRelationshipAnnotation(field.description);
    return (relationshipAnnotation == null) || relationshipAnnotation.kind !== 'oneToMany';
}
// tslint:disable-next-line: no-reserved-keywords
export function getRelationFieldName(field, type) {
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
export function getInputFieldName(field) {
    const relationshipAnnotation = parseRelationshipAnnotation(field.description);
    if (relationshipAnnotation == null) {
        return field.name;
    }
    if (relationshipAnnotation.kind === 'oneToMany') {
        throw new Error('Not inputtable field!');
    }
    return relationshipAnnotation.key || transformForeignKeyName(field.name);
}
export function getInputFieldTypeName(modelName, field, operation) {
    const fieldType = getNamedType(field.type);
    if (isObjectType(fieldType) && isModelType(fieldType)) {
        const relationshipAnnotation = parseRelationshipAnnotation(field.description);
        if (relationshipAnnotation == null) {
            throw new Error(`Missing relationship definition on: "${modelName}.${field.name}". Visit https://graphback.dev/docs/model/datamodel#relationships to see how you can define relationship in your business model.`);
        }
        const idField = getPrimaryKey(fieldType);
        return getNamedType(idField.type).name;
    }
    if (isScalarType(fieldType) || isEnumType(fieldType)) {
        return fieldType.name;
    }
    if (isObjectType(fieldType) && !isModelType(fieldType)) {
        // TODO: Filtering on JSON fields
        if (operation === GraphbackOperationType.FIND) {
            return undefined;
            // return GraphQLJSON
        }
        return getInputTypeName(fieldType.name, operation);
    }
    return undefined;
}
//# sourceMappingURL=mappingHelpers.js.map