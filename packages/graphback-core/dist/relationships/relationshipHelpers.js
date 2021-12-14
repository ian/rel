"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendOneToManyFieldArguments = exports.extendRelationshipFields = exports.addRelationshipFields = exports.relationshipOneToOneFieldDescriptionTemplate = exports.relationshipFieldDescriptionTemplate = exports.isOneToManyField = exports.parseRelationshipAnnotation = void 0;
const graphql_metadata_1 = require("graphql-metadata");
const graphql_1 = require("graphql");
const crud_1 = require("../crud");
/**
 * Parse relationship metadata string to strongly-typed interface
 *
 * @param description field description
 */
function parseRelationshipAnnotation(description = '') {
    const relationshipKinds = ['oneToMany', 'oneToOne', 'manyToOne'];
    for (const kind of relationshipKinds) {
        const annotation = graphql_metadata_1.parseMetadata(kind, description);
        if (!annotation) {
            continue;
        }
        // TODO: Should not throw error here
        if (!annotation.field && kind !== 'oneToOne') {
            throw new Error(`'field' is required on "${kind}" relationship annotations`);
        }
        return Object.assign({ kind }, annotation);
    }
    return undefined;
}
exports.parseRelationshipAnnotation = parseRelationshipAnnotation;
/**
 * Helper to check if a field is a oneToMany
 * @param fieldName
 * @param relationships
 */
function isOneToManyField(field) {
    const oneToManyAnnotation = graphql_metadata_1.parseMetadata('oneToMany', field.description);
    return !!oneToManyAnnotation;
}
exports.isOneToManyField = isOneToManyField;
/**
 * Generic template for relationship annotations
 *
 * @param relationshipKind
 * @param fieldName
 * @param columnKey
 */
const relationshipFieldDescriptionTemplate = (relationshipKind, fieldName, columnKey) => {
    return `@${relationshipKind}(field: '${fieldName}', key: '${columnKey}')`;
};
exports.relationshipFieldDescriptionTemplate = relationshipFieldDescriptionTemplate;
/**
 * Template for one-to-one relationship annotations
 *
 * @param relationshipKind
 * @param fieldName
 * @param columnKey
 */
const relationshipOneToOneFieldDescriptionTemplate = (relationshipKind, columnKey) => {
    return `@${relationshipKind}(key: '${columnKey}')`;
};
exports.relationshipOneToOneFieldDescriptionTemplate = relationshipOneToOneFieldDescriptionTemplate;
/**
 * Generate relationship fields inferred from metadata
 * and add to the model type
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
function addRelationshipFields(model, typeComposer) {
    const modelType = model.graphqlType;
    const modelFields = modelType.getFields();
    const fieldsObj = {};
    for (const current of model.relationships) {
        if (!modelFields[current.ownerField.name]) {
            fieldsObj[current.ownerField.name] = {
                type: current.ownerField.type,
                description: current.ownerField.description
            };
        }
    }
    typeComposer.addFields(fieldsObj);
}
exports.addRelationshipFields = addRelationshipFields;
/**
 * Extends an existing relationship field by adding metadata such as annotations
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
function extendRelationshipFields(model, typeComposer) {
    const modelType = model.graphqlType;
    const modelFields = modelType.getFields();
    for (const fieldRelationship of model.relationships) {
        if (modelFields[fieldRelationship.ownerField.name]) {
            const modelField = modelFields[fieldRelationship.ownerField.name];
            const partialConfig = {
                type: modelField.type,
                description: fieldRelationship.ownerField.description
            };
            typeComposer.extendField(fieldRelationship.ownerField.name, partialConfig);
        }
    }
}
exports.extendRelationshipFields = extendRelationshipFields;
/**
 * Extend one-to-many field by adding filter arguments
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
function extendOneToManyFieldArguments(model, typeComposer) {
    const modelType = model.graphqlType;
    const modelFields = modelType.getFields();
    for (const current of model.relationships) {
        if (modelFields[current.ownerField.name]) {
            const fieldNamedType = graphql_1.getNamedType(current.ownerField.type);
            if (current.kind !== 'oneToMany') {
                continue;
            }
            const partialConfig = {
                args: {
                    filter: crud_1.getInputTypeName(fieldNamedType.name, crud_1.GraphbackOperationType.FIND)
                }
            };
            typeComposer.extendField(current.ownerField.name, partialConfig);
        }
    }
}
exports.extendOneToManyFieldArguments = extendOneToManyFieldArguments;
//# sourceMappingURL=relationshipHelpers.js.map