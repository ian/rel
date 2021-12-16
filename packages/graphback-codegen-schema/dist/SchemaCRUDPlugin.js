"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCRUDPlugin = exports.SCHEMA_CRUD_PLUGIN_NAME = void 0;
const tslib_1 = require("tslib");
/* eslint-disable max-lines */
const path_1 = require("path");
const fs_1 = require("fs");
const DataLoader = require("dataloader");
const graphql_metadata_1 = require("graphql-metadata");
const graphql_compose_1 = require("graphql-compose");
const graphql_1 = require("graphql");
const core_1 = require("@graphback/core");
const schemaFormatters_1 = require("./writer/schemaFormatters");
const schemaDefinitions_1 = require("./definitions/schemaDefinitions");
exports.SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";
/**
 * Graphback CRUD operations plugin
 *
 * Plugins adds additional Queries, Mutations and Subscriptions into the Schema along
 * with required input types and scalars. Plugin can be used automatically define best
 * patterns for CRUD operations on top of GraphQL Schema
 * Plugin checkes all types annotated with model
 *
 * Used graphql metadata:
 *
 * - model: marks type to be processed by CRUD generator
 * - crud: controls what types of operations can be generated.
 * For example crud.update: false will disable updates for type
 */
class SchemaCRUDPlugin extends core_1.GraphbackPlugin {
    constructor(pluginConfig) {
        super();
        this.pluginConfig = Object.assign({}, pluginConfig);
    }
    transformSchema(metadata) {
        const schema = metadata.getSchema();
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            this.logWarning("Provided schema has no models. Returning original schema without any changes.");
            return schema;
        }
        ;
        const schemaComposer = new graphql_compose_1.SchemaComposer(schema);
        this.buildSchemaModelRelationships(schemaComposer, models);
        this.buildSchemaForModels(schemaComposer, models);
        this.addVersionedMetadataFields(schemaComposer, models);
        return schemaComposer.buildSchema();
    }
    /**
     * Creates CRUD resolvers
     *
     * @param {GraphbackCoreMetadata} metadata - Core metatata containing all model information
     */
    createResolvers(metadata) {
        const models = metadata.getModelDefinitions();
        if (models.length === 0) {
            return undefined;
        }
        const resolvers = {};
        // Graphback scalar resolvers
        const schema = metadata.getSchema();
        for (const graphbackScalar of core_1.graphbackScalarsTypes) {
            if (schema.getType(graphbackScalar.name)) {
                resolvers[graphbackScalar.name] = graphbackScalar;
            }
        }
        const modelNameToModelDefinition = models
            .reduce((acc, model) => {
            return Object.assign(Object.assign({}, acc), { [model.graphqlType.name]: model });
        }, {});
        for (const model of models) {
            this.addQueryResolvers(model, resolvers);
            this.addMutationResolvers(model, resolvers);
            this.addSubscriptionResolvers(model, resolvers);
            this.addRelationshipResolvers(model, resolvers, modelNameToModelDefinition);
        }
        return resolvers;
    }
    createResources(metadata) {
        if (!this.pluginConfig.outputPath) {
            return;
        }
        let schemaPath = path_1.resolve(this.pluginConfig.outputPath);
        // check if user path is to directory or full path to schema
        // assign default file name otherwise
        if (schemaPath.indexOf('.') === -1) {
            schemaPath = path_1.join(schemaPath, 'schema.graphql');
        }
        // get file extension
        const fileExtension = schemaPath.split('.').pop();
        const schemaString = this.transformSchemaToString(metadata.getSchema(), fileExtension);
        const outputDir = path_1.resolve(path_1.dirname(this.pluginConfig.outputPath));
        if (!fs_1.existsSync(outputDir)) {
            fs_1.mkdirSync(outputDir, { recursive: true });
        }
        fs_1.writeFileSync(schemaPath, schemaString);
    }
    getPluginName() {
        return exports.SCHEMA_CRUD_PLUGIN_NAME;
    }
    buildSchemaForModels(schemaComposer, models) {
        this.createSchemaCRUDTypes(schemaComposer);
        for (const model of Object.values(models)) {
            this.createQueries(model, schemaComposer);
            this.createMutations(model, schemaComposer);
            this.createSubscriptions(model, schemaComposer);
        }
        for (const model of Object.values(models)) {
            const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
            core_1.extendOneToManyFieldArguments(model, modifiedType);
        }
    }
    createSubscriptions(model, schemaComposer) {
        const name = model.graphqlType.name;
        const modelTC = schemaComposer.getOTC(name);
        const modelType = modelTC.getType();
        schemaDefinitions_1.buildSubscriptionFilterType(schemaComposer, modelType);
        const subscriptionFields = {};
        if (model.crudOptions.subCreate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.CREATE);
            const filterInputName = core_1.getInputTypeName(name, core_1.GraphbackOperationType.SUBSCRIPTION_CREATE);
            const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType();
            subscriptionFields[operation] = {
                type: graphql_1.GraphQLNonNull(modelType),
                args: {
                    filter: {
                        type: subCreateFilterInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subUpdate) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.UPDATE);
            const filterInputName = core_1.getInputTypeName(name, core_1.GraphbackOperationType.SUBSCRIPTION_UPDATE);
            const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType();
            subscriptionFields[operation] = {
                type: graphql_1.GraphQLNonNull(modelType),
                args: {
                    filter: {
                        type: subUpdateFilterInputType,
                    },
                }
            };
        }
        if (model.crudOptions.subDelete) {
            const operation = core_1.getSubscriptionName(name, core_1.GraphbackOperationType.DELETE);
            const filterInputName = core_1.getInputTypeName(name, core_1.GraphbackOperationType.SUBSCRIPTION_DELETE);
            const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType();
            subscriptionFields[operation] = {
                type: graphql_1.GraphQLNonNull(modelType),
                args: {
                    filter: {
                        type: subDeleteFilterInputType,
                    },
                }
            };
        }
        schemaComposer.Subscription.addFields(subscriptionFields);
    }
    createSchema(queryTypes, mutationTypes, subscriptionTypes) {
        const queryType = new graphql_1.GraphQLObjectType({
            name: 'Query',
            fields: () => (queryTypes)
        });
        let mutationType;
        if (Object.keys(mutationTypes).length !== 0) {
            mutationType = new graphql_1.GraphQLObjectType({
                name: 'Mutation',
                fields: () => (mutationTypes)
            });
        }
        let subscriptionType;
        if (Object.keys(subscriptionTypes).length !== 0) {
            subscriptionType = new graphql_1.GraphQLObjectType({
                name: 'Subscription',
                fields: () => (subscriptionTypes)
            });
        }
        return new graphql_1.GraphQLSchema({
            query: queryType,
            mutation: mutationType,
            subscription: subscriptionType
        });
    }
    createMutations(model, schemaComposer) {
        const name = model.graphqlType.name;
        const modelTC = schemaComposer.getOTC(name);
        const modelType = modelTC.getType();
        schemaDefinitions_1.buildMutationInputType(schemaComposer, modelType);
        const mutationFields = {};
        if (model.crudOptions.create) {
            const operationType = core_1.GraphbackOperationType.CREATE;
            schemaDefinitions_1.buildCreateMutationInputType(schemaComposer, modelType);
            const inputTypeName = core_1.getInputTypeName(name, operationType);
            const createMutationInputType = schemaComposer.getITC(inputTypeName).getType();
            const operation = core_1.getFieldName(name, operationType);
            mutationFields[operation] = {
                type: modelType,
                args: {
                    input: {
                        type: graphql_1.GraphQLNonNull(createMutationInputType)
                    },
                }
            };
        }
        if (model.crudOptions.update) {
            const operationType = core_1.GraphbackOperationType.UPDATE;
            const operation = core_1.getFieldName(name, operationType);
            const inputTypeName = core_1.getInputTypeName(name, operationType);
            const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType();
            mutationFields[operation] = {
                type: modelType,
                args: {
                    input: {
                        type: graphql_1.GraphQLNonNull(updateMutationInputType)
                    },
                }
            };
        }
        if (model.crudOptions.delete) {
            const operationType = core_1.GraphbackOperationType.DELETE;
            const operation = core_1.getFieldName(name, operationType);
            const inputTypeName = core_1.getInputTypeName(name, operationType);
            const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType();
            mutationFields[operation] = {
                type: modelType,
                args: {
                    input: {
                        type: graphql_1.GraphQLNonNull(deleteMutationInputType)
                    }
                }
            };
        }
        schemaComposer.Mutation.addFields(mutationFields);
    }
    createQueries(model, schemaComposer) {
        const name = model.graphqlType.name;
        const modelTC = schemaComposer.getOTC(name);
        const modelType = modelTC.getType();
        schemaDefinitions_1.buildFilterInputType(schemaComposer, modelType);
        const queryFields = {};
        if (model.crudOptions.findOne) {
            const operation = core_1.getFieldName(name, core_1.GraphbackOperationType.FIND_ONE);
            queryFields[operation] = {
                type: model.graphqlType,
                args: schemaDefinitions_1.buildFindOneFieldMap(model, schemaComposer)
            };
        }
        if (model.crudOptions.find) {
            const operationType = core_1.GraphbackOperationType.FIND;
            const operation = core_1.getFieldName(name, operationType);
            const inputTypeName = core_1.getInputTypeName(name, operationType);
            const filterInputType = schemaComposer.getITC(inputTypeName).getType();
            const resultListType = schemaDefinitions_1.createModelListResultType(modelType);
            queryFields[operation] = {
                type: graphql_1.GraphQLNonNull(resultListType),
                args: {
                    filter: {
                        type: filterInputType
                    },
                    page: {
                        type: schemaDefinitions_1.PageRequest
                    },
                    orderBy: {
                        type: schemaDefinitions_1.OrderByInputType
                    }
                }
            };
        }
        schemaComposer.Query.addFields(queryFields);
    }
    addVersionedMetadataFields(schemaComposer, models) {
        const timeStampInputName = schemaDefinitions_1.getInputName(core_1.Timestamp);
        let timestampInputType;
        let timestampType;
        for (const model of models) {
            const name = model.graphqlType.name;
            const modelTC = schemaComposer.getOTC(name);
            const desc = model.graphqlType.description;
            const { markers } = core_1.metadataMap;
            if (graphql_metadata_1.parseMetadata(markers.versioned, desc)) {
                const updateField = model.fields[core_1.metadataMap.fieldNames.updatedAt];
                const createAtField = model.fields[core_1.metadataMap.fieldNames.createdAt];
                const errorMessage = (field) => `Type "${model.graphqlType.name}" annotated with @versioned, cannot contain custom "${field}" field since it is generated automatically. Either remove the @versioned annotation, change the type of the field to "${core_1.Timestamp.name}" or remove the field.`;
                if (createAtField && createAtField.type !== core_1.Timestamp.name) {
                    throw new Error(errorMessage(core_1.metadataMap.fieldNames.createdAt));
                }
                if (updateField && updateField.type !== core_1.Timestamp.name) {
                    throw new Error(errorMessage(core_1.metadataMap.fieldNames.updatedAt));
                }
                if (!timestampInputType) {
                    if (schemaComposer.has(core_1.Timestamp.name)) {
                        timestampInputType = schemaComposer.getITC(timeStampInputName).getType();
                    }
                    else {
                        schemaComposer.createScalarTC(core_1.Timestamp);
                        timestampInputType = schemaDefinitions_1.createInputTypeForScalar(core_1.Timestamp);
                        schemaComposer.add(timestampInputType);
                    }
                    timestampType = schemaComposer.getSTC(core_1.Timestamp.name).getType();
                }
                const metadataFields = schemaDefinitions_1.createVersionedFields(timestampType);
                // metadata fields needed for @versioned
                modelTC.addFields(metadataFields);
                const inputType = schemaComposer.getITC(core_1.getInputTypeName(name, core_1.GraphbackOperationType.FIND));
                if (inputType) {
                    const metadataInputFields = schemaDefinitions_1.createVersionedInputFields(timestampInputType);
                    inputType.addFields(metadataInputFields);
                }
            }
        }
        ;
    }
    /**
     *
     * Print schema as a string and format in one of the available languages
     *
     * @param {GraphQLSchema} schema
     * @param {string} fileExtension
     */
    transformSchemaToString(schema, fileExtension) {
        const schemaString = core_1.printSchemaWithDirectives(schema);
        if (this.pluginConfig) {
            if (fileExtension === 'ts') {
                return schemaFormatters_1.tsSchemaFormatter.format(schemaString);
            }
            if (fileExtension === 'js') {
                return schemaFormatters_1.jsSchemaFormatter.format(schemaString);
            }
            if (fileExtension === 'graphql') {
                return schemaFormatters_1.gqlSchemaFormatter.format(schemaString);
            }
        }
        throw Error(`Invalid format '${fileExtension}' specified. \`options.format\` supports only \`ts\`, \`js\` and \`graphql\` flags`);
    }
    /**
     * Create Query resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    addQueryResolvers(model, resolvers) {
        if (model.crudOptions.findOne || model.crudOptions.find) {
            resolvers.Query = (resolvers.Query || {});
            if (model.crudOptions.findOne) {
                this.addFindOneQueryResolver(model, resolvers.Query);
            }
            if (model.crudOptions.find) {
                this.addFindQueryResolver(model, resolvers.Query);
            }
        }
    }
    /**
     * Create Mutation resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    addMutationResolvers(model, resolvers) {
        if (model.crudOptions.create || model.crudOptions.update || model.crudOptions.delete) {
            resolvers.Mutation = (resolvers.Mutation || {});
            if (model.crudOptions.create) {
                this.addCreateMutationResolver(model, resolvers.Mutation);
            }
            if (model.crudOptions.update) {
                this.addUpdateMutationResolver(model, resolvers.Mutation);
            }
            if (model.crudOptions.delete) {
                this.addDeleteMutationResolver(model, resolvers.Mutation);
            }
        }
    }
    /**
     * Create Subscription resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    addSubscriptionResolvers(model, resolvers) {
        const modelType = model.graphqlType;
        if (model.crudOptions.subCreate || model.crudOptions.subUpdate || model.crudOptions.subDelete) {
            resolvers.Subscription = (resolvers.Subscription || {});
            if (model.crudOptions.subCreate) {
                this.addCreateSubscriptionResolver(modelType, resolvers.Subscription);
            }
            if (model.crudOptions.subUpdate) {
                this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription);
            }
            if (model.crudOptions.subDelete) {
                this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription);
            }
        }
    }
    /**
     * Create relationship resolver fields
     *
     * @param {ModelDefinition} model - Model definition with relationship metadata
     * @param {IResolvers} resolversObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    addRelationshipResolvers(model, resolversObj, modelNameToModelDefinition) {
        const relationResolvers = {};
        for (const relationship of model.relationships) {
            if (relationship.kind === 'oneToMany') {
                this.addOneToManyResolver(relationship, relationResolvers, modelNameToModelDefinition);
            }
            else {
                this.addOneToOneResolver(relationship, relationResolvers, modelNameToModelDefinition);
            }
        }
        if (Object.keys(relationResolvers).length > 0) {
            resolversObj[model.graphqlType.name] = relationResolvers;
        }
    }
    /**
     * Creates a Create mutation resolver field
     *
     * @param {ModelDefinition} model - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addCreateMutationResolver(model, mutationObj) {
        const modelType = model.graphqlType;
        const modelName = modelType.name;
        const resolverCreateField = core_1.getFieldName(modelName, core_1.GraphbackOperationType.CREATE);
        mutationObj[resolverCreateField] = (_, args, context, info) => {
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            return context.graphback[modelName].create(args.input, context, info);
        };
    }
    /**
     * Creates an Update mutation resolver
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addUpdateMutationResolver(model, mutationObj) {
        const modelName = model.graphqlType.name;
        const updateField = core_1.getFieldName(modelName, core_1.GraphbackOperationType.UPDATE);
        mutationObj[updateField] = (_, args, context, info) => {
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            return context.graphback[modelName].update(args.input, context, info);
        };
    }
    /**
     * Creates a Delete Mutation resolver field
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addDeleteMutationResolver(model, mutationObj) {
        const modelName = model.graphqlType.name;
        const deleteField = core_1.getFieldName(modelName, core_1.GraphbackOperationType.DELETE);
        mutationObj[deleteField] = (_, args, context, info) => {
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            return context.graphback[modelName].delete(args.input, context, info);
        };
    }
    /**
     * Creates a Find Query resolver field
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addFindQueryResolver(model, queryObj) {
        const modelType = model.graphqlType;
        const modelName = modelType.name;
        const findField = core_1.getFieldName(modelName, core_1.GraphbackOperationType.FIND);
        queryObj[findField] = (_, args, context, info) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return context.graphback[modelName].findBy(args, context, info, 'items');
        });
    }
    /**
     * Creates a FindOne Query resolver
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addFindOneQueryResolver(model, queryObj) {
        const modelType = model.graphqlType;
        const modelName = modelType.name;
        const findOneField = core_1.getFieldName(modelName, core_1.GraphbackOperationType.FIND_ONE);
        const primaryKeyLabel = model.primaryKey.name;
        queryObj[findOneField] = (_, args, context, info) => {
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context, info);
        };
    }
    /**
     * Creates a Create Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addCreateSubscriptionResolver(modelType, subscriptionObj) {
        const modelName = modelType.name;
        const operation = core_1.getSubscriptionName(modelName, core_1.GraphbackOperationType.CREATE);
        subscriptionObj[operation] = {
            subscribe: (_, args, context) => {
                if (!context.graphback || !context.graphback[modelName]) {
                    throw new Error(`Missing service for ${modelName}`);
                }
                return context.graphback[modelName].subscribeToCreate(args.filter, context);
            }
        };
    }
    /**
     * Creates an Update Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addUpdateSubscriptionResolver(modelType, subscriptionObj) {
        const modelName = modelType.name;
        const operation = core_1.getSubscriptionName(modelName, core_1.GraphbackOperationType.UPDATE);
        subscriptionObj[operation] = {
            subscribe: (_, args, context) => {
                if (!context.graphback || !context.graphback[modelName]) {
                    throw new Error(`Missing service for ${modelName}`);
                }
                return context.graphback[modelName].subscribeToUpdate(args.filter, context);
            }
        };
    }
    /**
     * Creates a Delete Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    addDeleteSubscriptionResolver(modelType, subscriptionObj) {
        const modelName = modelType.name;
        const operation = core_1.getSubscriptionName(modelName, core_1.GraphbackOperationType.DELETE);
        subscriptionObj[operation] = {
            subscribe: (_, args, context) => {
                if (!context.graphback || !context.graphback[modelName]) {
                    throw new Error(`Missing service for ${modelName}`);
                }
                return context.graphback[modelName].subscribeToDelete(args.filter, context);
            }
        };
    }
    /**
     * Creates a OneToMany Relationship resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IResolvers} resolverObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    addOneToManyResolver(relationship, resolverObj, modelNameToModelDefinition) {
        const modelName = relationship.relationType.name;
        const relationOwner = relationship.ownerField.name;
        const model = modelNameToModelDefinition[modelName];
        resolverObj[relationOwner] = (parent, args, context, info) => {
            if (Object.keys(parent).includes(relationOwner)) {
                return parent[relationOwner];
            }
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            return context.graphback[modelName].batchLoadData(relationship.relationForeignKey, parent[model.primaryKey.name], args.filter, context, info);
        };
    }
    /**
     * Creates a OneToOne/ManyToOne Relationship resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IResolvers} resolverObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    addOneToOneResolver(relationship, resolverObj, modelNameToModelDefinition) {
        const modelName = relationship.relationType.name;
        const relationIdField = core_1.getPrimaryKey(relationship.relationType);
        const relationOwner = relationship.ownerField.name;
        const model = modelNameToModelDefinition[modelName];
        resolverObj[relationOwner] = (parent, _, context, info) => {
            if (Object.keys(parent).includes(relationOwner)) {
                return parent[relationOwner];
            }
            if (!context.graphback || !context.graphback[modelName]) {
                throw new Error(`Missing service for ${modelName}`);
            }
            const selectedFields = core_1.getSelectedFieldsFromResolverInfo(info, model);
            selectedFields.push(relationIdField.name);
            const fetchedKeys = selectedFields.join('-');
            // construct a unique key to identify the dataloader
            const dataLoaderName = `${modelName}-${relationship.kind}-${relationIdField.name}-${relationship.relationForeignKey}-${fetchedKeys}-DataLoader`;
            if (!context[dataLoaderName]) {
                context[dataLoaderName] = new DataLoader((keys) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const service = context.graphback[modelName];
                    const results = yield service.findBy({ [relationIdField.name]: { in: keys }, }, context, info);
                    return keys.map((key) => {
                        return results.items.find((item) => item[relationIdField.name].toString() === key.toString());
                    });
                }));
            }
            const relationForeignKey = parent[relationship.relationForeignKey];
            // eslint-disable-next-line no-null/no-null
            if (relationForeignKey === undefined || relationForeignKey === null) {
                // eslint-disable-next-line no-null/no-null
                return null;
            }
            return context[dataLoaderName].load(relationForeignKey);
        };
    }
    createSchemaCRUDTypes(schemaComposer) {
        schemaComposer.add(schemaDefinitions_1.PageRequest);
        schemaComposer.add(schemaDefinitions_1.IDScalarInputType);
        schemaComposer.add(schemaDefinitions_1.SortDirectionEnum);
        schemaComposer.add(schemaDefinitions_1.StringScalarInputType);
        schemaComposer.add(schemaDefinitions_1.BooleanScalarInputType);
        schemaComposer.add(schemaDefinitions_1.createInputTypeForScalar(graphql_1.GraphQLInt));
        schemaComposer.add(schemaDefinitions_1.createInputTypeForScalar(graphql_1.GraphQLFloat));
        schemaComposer.forEach((tc) => {
            const namedType = tc.getType();
            if (graphql_1.isScalarType(namedType) && !graphql_1.isSpecifiedScalarType(namedType) && core_1.FILTER_SUPPORTED_SCALARS.includes(namedType.name)) {
                schemaComposer.add(schemaDefinitions_1.createInputTypeForScalar(namedType));
                return;
            }
            const isRootType = ['Query', 'Subscription', 'Mutation'].includes(namedType.name);
            if (graphql_1.isObjectType(namedType) && !core_1.isModelType(namedType) && !isRootType) {
                schemaDefinitions_1.addCreateObjectInputType(schemaComposer, namedType);
                schemaDefinitions_1.addUpdateObjectInputType(schemaComposer, namedType);
            }
        });
    }
    /**
     * Add relationship fields to GraphQL model types
     *
     * @param schema
     * @param models
     */
    buildSchemaModelRelationships(schemaComposer, models) {
        // create or update relationship fields to the model types.
        for (const model of models) {
            const modifiedType = schemaComposer.getOTC(model.graphqlType.name);
            core_1.addRelationshipFields(model, modifiedType);
            core_1.extendRelationshipFields(model, modifiedType);
        }
    }
}
exports.SchemaCRUDPlugin = SchemaCRUDPlugin;
//# sourceMappingURL=SchemaCRUDPlugin.js.map