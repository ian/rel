import { SchemaComposer } from 'graphql-compose';
import { IResolvers, IObjectTypeResolver } from '@graphql-tools/utils';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GraphbackCoreMetadata, GraphbackPlugin, ModelDefinition, FieldRelationshipMetadata } from '@graphback/core';
/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
    /**
     * RelativePath for the output files created by generator
     * e.g. /path/to/schema/schema.graphql
     */
    outputPath?: string;
}
export declare const SCHEMA_CRUD_PLUGIN_NAME = "SchemaCRUD";
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
export declare class SchemaCRUDPlugin extends GraphbackPlugin {
    private readonly pluginConfig;
    constructor(pluginConfig?: SchemaCRUDPluginConfig);
    transformSchema(metadata: GraphbackCoreMetadata): GraphQLSchema;
    /**
     * Creates CRUD resolvers
     *
     * @param {GraphbackCoreMetadata} metadata - Core metatata containing all model information
     */
    createResolvers(metadata: GraphbackCoreMetadata): IResolvers;
    createResources(metadata: GraphbackCoreMetadata): void;
    getPluginName(): string;
    protected buildSchemaForModels(schemaComposer: SchemaComposer<any>, models: ModelDefinition[]): void;
    protected createSubscriptions(model: ModelDefinition, schemaComposer: SchemaComposer<any>): void;
    protected createSchema(queryTypes: any, mutationTypes: any, subscriptionTypes: any): GraphQLSchema;
    protected createMutations(model: ModelDefinition, schemaComposer: SchemaComposer<any>): void;
    protected createQueries(model: ModelDefinition, schemaComposer: SchemaComposer<any>): void;
    protected addVersionedMetadataFields(schemaComposer: SchemaComposer<any>, models: ModelDefinition[]): void;
    /**
     *
     * Print schema as a string and format in one of the available languages
     *
     * @param {GraphQLSchema} schema
     * @param {string} fileExtension
     */
    protected transformSchemaToString(schema: GraphQLSchema, fileExtension: string): string;
    /**
     * Create Query resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    protected addQueryResolvers(model: ModelDefinition, resolvers: IResolvers): void;
    /**
     * Create Mutation resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    protected addMutationResolvers(model: ModelDefinition, resolvers: IResolvers): void;
    /**
     * Create Subscription resolver fields
     *
     * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
     * @param {IResolvers} resolvers - root resolver object
     */
    protected addSubscriptionResolvers(model: ModelDefinition, resolvers: IResolvers): void;
    /**
     * Create relationship resolver fields
     *
     * @param {ModelDefinition} model - Model definition with relationship metadata
     * @param {IResolvers} resolversObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    protected addRelationshipResolvers(model: ModelDefinition, resolversObj: IResolvers, modelNameToModelDefinition: any): void;
    /**
     * Creates a Create mutation resolver field
     *
     * @param {ModelDefinition} model - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addCreateMutationResolver(model: ModelDefinition, mutationObj: IObjectTypeResolver): void;
    /**
     * Creates an Update mutation resolver
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addUpdateMutationResolver(model: ModelDefinition, mutationObj: IObjectTypeResolver): void;
    /**
     * Creates an UpdateBy mutation resolver
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addUpdateByMutationResolver(model: ModelDefinition, mutationObj: IObjectTypeResolver): void;
    /**
     * Creates a Delete Mutation resolver field
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addDeleteMutationResolver(model: ModelDefinition, mutationObj: IObjectTypeResolver): void;
    /**
     * Creates a DeleteBy Mutation resolver field
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addDeleteByMutationResolver(model: ModelDefinition, mutationObj: IObjectTypeResolver): void;
    /**
     * Creates a Find Query resolver field
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addFindQueryResolver(model: ModelDefinition, queryObj: IObjectTypeResolver): void;
    /**
     * Creates a FindOne Query resolver
     *
     * @param {ModelDefinition} model - Model definition object
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addFindOneQueryResolver(model: ModelDefinition, queryObj: IObjectTypeResolver): void;
    /**
     * Creates a Create Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addCreateSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver): void;
    /**
     * Creates an Update Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addUpdateSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver): void;
    /**
     * Creates a Delete Subscription resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IFieldResolver} mutationObj - Mutation resolver object
     */
    protected addDeleteSubscriptionResolver(modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver): void;
    /**
     * Creates a OneToMany Relationship resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IResolvers} resolverObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    protected addOneToManyResolver(relationship: FieldRelationshipMetadata, resolverObj: IResolvers, modelNameToModelDefinition: any): void;
    /**
     * Creates a OneToOne/ManyToOne Relationship resolver field
     *
     * @param {GraphQLObjectType} modelType - Model GraphQL object type
     * @param {IResolvers} resolverObj - Resolvers object
     * @param modelNameToModelDefinition - model type name to its definition for quick search
     */
    protected addOneToOneResolver(relationship: FieldRelationshipMetadata, resolverObj: IResolvers, modelNameToModelDefinition: any): void;
    private createSchemaCRUDTypes;
    /**
     * Add relationship fields to GraphQL model types
     *
     * @param schema
     * @param models
     */
    private buildSchemaModelRelationships;
}
//# sourceMappingURL=SchemaCRUDPlugin.d.ts.map