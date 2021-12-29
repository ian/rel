import { parseMetadata } from 'graphql-metadata';
import { mergeResolvers } from '@graphql-tools/merge';
import { getNamedType } from 'graphql';
import { getUserTypesFromSchema } from '@graphql-tools/utils';
import { getPrimaryKey } from '../db';
import { RelationshipMetadataBuilder } from '../relationships/RelationshipMetadataBuilder';
import { isTransientField } from '../utils/isTransientField';
const defaultCRUDGeneratorConfig = {
    create: true,
    update: true,
    updateBy: true,
    findOne: true,
    find: true,
    delete: true,
    deleteBy: true,
    subCreate: true,
    subUpdate: true,
    subDelete: true
};
/**
 * Contains Graphback Core Models
 */
export class GraphbackCoreMetadata {
    supportedCrudMethods;
    schema;
    resolvers;
    models;
    constructor(globalConfig, schema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign({}, defaultCRUDGeneratorConfig, globalConfig?.crudMethods);
    }
    getSchema() {
        return this.schema;
    }
    setSchema(newSchema) {
        this.schema = newSchema;
    }
    addResolvers(resolvers) {
        if (resolvers) {
            const mergedResolvers = [
                this.resolvers,
                resolvers
            ];
            this.resolvers = mergeResolvers(mergedResolvers);
        }
    }
    getResolvers() {
        return this.resolvers;
    }
    /**
     * Get Graphback Models - GraphQL Types with additional CRUD configuration
     */
    getModelDefinitions() {
        // Contains map of the models with their underlying CRUD configuration
        this.models = [];
        // Get actual user types
        const modelTypes = this.getGraphQLTypesWithModel();
        const relationshipBuilder = new RelationshipMetadataBuilder(modelTypes);
        relationshipBuilder.build();
        for (const modelType of modelTypes) {
            const model = this.buildModel(modelType, relationshipBuilder.getModelRelationships(modelType.name));
            this.models.push(model);
        }
        return this.models;
    }
    /**
     * Helper for plugins to fetch all types that should be processed by Graphback plugins.
     * To mark type as enabled for graphback generators we need to add `model` annotations over the type.
     *
     * Returns all user types that have @model in description
     * @param schema
     */
    getGraphQLTypesWithModel() {
        const types = getUserTypesFromSchema(this.schema);
        return types.filter((modelType) => parseMetadata('model', modelType));
    }
    buildModel(modelType, relationships) {
        let crudOptions = parseMetadata('model', modelType);
        // Merge CRUD options from type with global ones
        crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions);
        // Whether to add delta queries
        const { type: primaryKeyType, name } = getPrimaryKey(modelType);
        const primaryKey = {
            name,
            type: getNamedType(primaryKeyType).name
        };
        // parse fields
        const modelFields = modelType.getFields();
        const fields = {};
        for (const field of Object.keys(modelFields)) {
            let fieldName = field;
            let type = '';
            const graphqlField = modelFields[field];
            if (isTransientField(graphqlField)) {
                fields[field] = {
                    name: field,
                    transient: true,
                    type: getNamedType(graphqlField.type).name
                };
                continue;
            }
            const foundRelationship = relationships.find((relationship) => relationship.ownerField.name === field);
            if (foundRelationship != null) {
                if (foundRelationship.kind !== 'oneToMany') {
                    fieldName = foundRelationship.relationForeignKey;
                    type = getNamedType(foundRelationship.relationType).name; // TODO properly retrieve field type for foreign key
                }
                else {
                    fieldName = primaryKey.name;
                    type = primaryKey.type;
                }
            }
            else {
                type = getNamedType(modelFields[field].type).name;
            }
            fields[field] = {
                name: fieldName,
                type,
                transient: false
            };
        }
        return {
            fields,
            primaryKey,
            crudOptions,
            relationships,
            graphqlType: modelType
        };
    }
}
//# sourceMappingURL=GraphbackCoreMetadata.js.map