"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphbackCoreMetadata = void 0;
const graphql_metadata_1 = require("graphql-metadata");
const merge_1 = require("@graphql-tools/merge");
const graphql_1 = require("graphql");
const utils_1 = require("@graphql-tools/utils");
const db_1 = require("../db");
const RelationshipMetadataBuilder_1 = require("../relationships/RelationshipMetadataBuilder");
const isTransientField_1 = require("../utils/isTransientField");
const defaultCRUDGeneratorConfig = {
    "create": true,
    "update": true,
    "updateBy": true,
    "findOne": true,
    "find": true,
    "delete": true,
    "deleteBy": true,
    "subCreate": true,
    "subUpdate": true,
    "subDelete": true,
};
/**
 * Contains Graphback Core Models
 */
class GraphbackCoreMetadata {
    constructor(globalConfig, schema) {
        this.schema = schema;
        this.supportedCrudMethods = Object.assign({}, defaultCRUDGeneratorConfig, globalConfig === null || globalConfig === void 0 ? void 0 : globalConfig.crudMethods);
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
            this.resolvers = merge_1.mergeResolvers(mergedResolvers);
        }
    }
    getResolvers() {
        return this.resolvers;
    }
    /**
     * Get Graphback Models - GraphQL Types with additional CRUD configuration
     */
    getModelDefinitions() {
        //Contains map of the models with their underlying CRUD configuration
        this.models = [];
        //Get actual user types
        const modelTypes = this.getGraphQLTypesWithModel();
        const relationshipBuilder = new RelationshipMetadataBuilder_1.RelationshipMetadataBuilder(modelTypes);
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
        const types = utils_1.getUserTypesFromSchema(this.schema);
        return types.filter((modelType) => graphql_metadata_1.parseMetadata('model', modelType));
    }
    buildModel(modelType, relationships) {
        let crudOptions = graphql_metadata_1.parseMetadata('model', modelType);
        //Merge CRUD options from type with global ones
        crudOptions = Object.assign({}, this.supportedCrudMethods, crudOptions);
        // Whether to add delta queries
        const { type: primaryKeyType, name } = db_1.getPrimaryKey(modelType);
        const primaryKey = {
            name,
            type: graphql_1.getNamedType(primaryKeyType).name
        };
        // parse fields
        const modelFields = modelType.getFields();
        const fields = {};
        for (const field of Object.keys(modelFields)) {
            let fieldName = field;
            let type = '';
            const graphqlField = modelFields[field];
            if (isTransientField_1.isTransientField(graphqlField)) {
                fields[field] = {
                    name: field,
                    transient: true,
                    type: graphql_1.getNamedType(graphqlField.type).name
                };
                continue;
            }
            const foundRelationship = relationships.find((relationship) => relationship.ownerField.name === field);
            if (foundRelationship) {
                if (foundRelationship.kind !== "oneToMany") {
                    fieldName = foundRelationship.relationForeignKey;
                    type = graphql_1.getNamedType(foundRelationship.relationType).name; // TODO properly retrieve field type for foreign key
                }
                else {
                    fieldName = primaryKey.name;
                    type = primaryKey.type;
                }
            }
            else {
                type = graphql_1.getNamedType(modelFields[field].type).name;
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
exports.GraphbackCoreMetadata = GraphbackCoreMetadata;
//# sourceMappingURL=GraphbackCoreMetadata.js.map