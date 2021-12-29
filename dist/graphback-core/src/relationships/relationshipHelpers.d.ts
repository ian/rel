import { GraphQLField } from 'graphql';
import { ObjectTypeComposer } from 'graphql-compose';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { RelationshipAnnotation } from './RelationshipMetadataBuilder';
/**
 * Parse relationship metadata string to strongly-typed interface
 *
 * @param description field description
 */
export declare function parseRelationshipAnnotation(description?: string): RelationshipAnnotation | undefined;
/**
 * Helper to check if a field is a oneToMany
 * @param fieldName
 * @param relationships
 */
export declare function isOneToManyField(field: GraphQLField<any, any>): boolean;
/**
 * Generic template for relationship annotations
 *
 * @param relationshipKind
 * @param fieldName
 * @param columnKey
 */
export declare const relationshipFieldDescriptionTemplate: (relationshipKind: 'oneToOne' | 'oneToMany' | 'manyToOne', fieldName: string, columnKey: string) => string;
/**
 * Template for one-to-one relationship annotations
 *
 * @param relationshipKind
 * @param fieldName
 * @param columnKey
 */
export declare const relationshipOneToOneFieldDescriptionTemplate: (relationshipKind: 'oneToOne' | 'oneToMany' | 'manyToOne', columnKey: string) => string;
/**
 * Generate relationship fields inferred from metadata
 * and add to the model type
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export declare function addRelationshipFields(model: ModelDefinition, typeComposer: ObjectTypeComposer): void;
/**
 * Extends an existing relationship field by adding metadata such as annotations
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export declare function extendRelationshipFields(model: ModelDefinition, typeComposer: ObjectTypeComposer): void;
/**
 * Extend one-to-many field by adding filter arguments
 *
 * @param {ModelDefinition} model - Graphback model definition
 * @param {ObjectTypeComposer} typeComposer - GraphQL Compose Type composer for the model
 */
export declare function extendOneToManyFieldArguments(model: ModelDefinition, typeComposer: ObjectTypeComposer): void;
//# sourceMappingURL=relationshipHelpers.d.ts.map