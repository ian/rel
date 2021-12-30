/* eslint-disable max-lines */
import { resolve, dirname, join } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import DataLoader from 'dataloader'
import { parseMetadata } from 'graphql-metadata'
import { SchemaComposer, NamedTypeComposer } from 'graphql-compose'
import { IResolvers, IObjectTypeResolver } from '@graphql-tools/utils'
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLFloat, isScalarType, isSpecifiedScalarType, GraphQLResolveInfo, isObjectType, GraphQLInputObjectType, GraphQLScalarType } from 'graphql'
import { Timestamp, getFieldName, metadataMap, printSchemaWithDirectives, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, addRelationshipFields, extendRelationshipFields, extendOneToManyFieldArguments, getInputTypeName, FieldRelationshipMetadata, GraphbackContext, getSelectedFieldsFromResolverInfo, isModelType, getPrimaryKey, graphbackScalarsTypes, FILTER_SUPPORTED_SCALARS, FindByArgs } from '@graphback/core'
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters'
import { buildFilterInputType, createModelListResultType, StringScalarInputType, BooleanScalarInputType, SortDirectionEnum, buildCreateMutationInputType, buildFindOneFieldMap, buildMutationInputType, OrderByInputType, buildSubscriptionFilterType, IDScalarInputType, PageRequest, createInputTypeForScalar, createVersionedFields, createVersionedInputFields, addCreateObjectInputType, addUpdateObjectInputType, getInputName, createMutationListResultType } from './definitions/schemaDefinitions'

/**
 * Configuration for Schema generator CRUD plugin
 */
export interface SchemaCRUDPluginConfig {
  /**
   * RelativePath for the output files created by generator
   * e.g. /path/to/schema/schema.graphql
   */
  outputPath?: string
}

export const SCHEMA_CRUD_PLUGIN_NAME = 'SchemaCRUD'

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
export class SchemaCRUDPlugin extends GraphbackPlugin {
  private readonly pluginConfig: SchemaCRUDPluginConfig

  public constructor (pluginConfig?: SchemaCRUDPluginConfig) {
    super()
    this.pluginConfig = {
      ...pluginConfig
    }
  }

  public transformSchema (metadata: GraphbackCoreMetadata): GraphQLSchema {
    const schema = metadata.getSchema()

    const models = metadata.getModelDefinitions()
    if (models.length === 0) {
      this.logWarning('Provided schema has no models. Returning original schema without any changes.')

      return schema
    };

    const schemaComposer = new SchemaComposer(schema)

    this.createAggregationForModelFields(schemaComposer, models)
    this.buildSchemaModelRelationships(schemaComposer, models)
    this.buildSchemaForModels(schemaComposer, models)
    this.addVersionedMetadataFields(schemaComposer, models)

    return schemaComposer.buildSchema()
  }

  /**
   * Creates CRUD resolvers
   *
   * @param {GraphbackCoreMetadata} metadata - Core metatata containing all model information
   */
  public createResolvers (metadata: GraphbackCoreMetadata): IResolvers {
    const models = metadata.getModelDefinitions()

    if (models.length === 0) {
      return undefined
    }

    const resolvers: IResolvers = {}

    // Graphback scalar resolvers
    const schema = metadata.getSchema()
    for (const graphbackScalar of graphbackScalarsTypes) {
      if (schema.getType(graphbackScalar.name)) {
        resolvers[graphbackScalar.name] = graphbackScalar
      }
    }

    const modelNameToModelDefinition = models
      .reduce((acc: any, model: ModelDefinition) => {
        return {
          ...acc,
          [model.graphqlType.name]: model
        }
      }, {})

    for (const model of models) {
      this.addQueryResolvers(model, resolvers)
      this.addMutationResolvers(model, resolvers)
      this.addSubscriptionResolvers(model, resolvers)
      this.addRelationshipResolvers(model, resolvers, modelNameToModelDefinition)
    }

    return resolvers
  }

  public createResources (metadata: GraphbackCoreMetadata): void {
    if (!this.pluginConfig.outputPath) {
      return
    }

    let schemaPath = resolve(this.pluginConfig.outputPath)

    // check if user path is to directory or full path to schema
    // assign default file name otherwise
    if (!schemaPath.includes('.')) {
      schemaPath = join(schemaPath, 'schema.graphql')
    }

    // get file extension
    const fileExtension = schemaPath.split('.').pop()

    const schemaString = this.transformSchemaToString(metadata.getSchema(), fileExtension)

    const outputDir = resolve(dirname(this.pluginConfig.outputPath))

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    writeFileSync(schemaPath, schemaString)
  }

  public getPluginName () {
    return SCHEMA_CRUD_PLUGIN_NAME
  }

  protected buildSchemaForModels (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    this.createSchemaCRUDTypes(schemaComposer)

    for (const model of Object.values(models)) {
      this.createQueries(model, schemaComposer)
      this.createMutations(model, schemaComposer)
      this.createSubscriptions(model, schemaComposer)
    }

    for (const model of Object.values(models)) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name)
      extendOneToManyFieldArguments(model, modifiedType)
    }
  }

  protected createSubscriptions (model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()

    buildSubscriptionFilterType(schemaComposer, modelType)

    const subscriptionFields = {}
    if (model.crudOptions.subCreate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.CREATE)

      const filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_CREATE)
      const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType()

      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subCreateFilterInputType
          }
        }
      }
    }
    if (model.crudOptions.subUpdate) {
      const operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)

      const filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_UPDATE)
      const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType()

      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subUpdateFilterInputType
          }
        }
      }
    }
    if (model.crudOptions.subDelete) {
      const operation = getSubscriptionName(name, GraphbackOperationType.DELETE)

      const filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_DELETE)
      const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType()

      subscriptionFields[operation] = {
        type: GraphQLNonNull(modelType),
        args: {
          filter: {
            type: subDeleteFilterInputType
          }
        }
      }
    }

    schemaComposer.Subscription.addFields(subscriptionFields)
  }

  protected createSchema (queryTypes: any, mutationTypes: any, subscriptionTypes: any) {
    const queryType = new GraphQLObjectType({
      name: 'Query',
      fields: () => (queryTypes)
    })

    let mutationType
    if (Object.keys(mutationTypes).length !== 0) {
      mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: () => (mutationTypes)
      })
    }

    let subscriptionType
    if (Object.keys(subscriptionTypes).length !== 0) {
      subscriptionType = new GraphQLObjectType({
        name: 'Subscription',
        fields: () => (subscriptionTypes)
      })
    }

    return new GraphQLSchema({
      query: queryType,
      mutation: mutationType,
      subscription: subscriptionType
    })
  }

  protected createMutations (model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()
    const resultListType = createMutationListResultType(modelType)
    buildMutationInputType(schemaComposer, modelType)

    const mutationFields = {}
    if (model.crudOptions.create) {
      const operationType = GraphbackOperationType.CREATE

      buildCreateMutationInputType(schemaComposer, modelType)

      const inputTypeName = getInputTypeName(name, operationType)
      const createMutationInputType = schemaComposer.getITC(inputTypeName).getType()

      const operation = getFieldName(name, operationType)
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(createMutationInputType)
          }
        }
      }
    }
    if (model.crudOptions.update) {
      const operationType = GraphbackOperationType.UPDATE
      const operation = getFieldName(name, operationType)

      const inputTypeName = getInputTypeName(name, operationType)
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType()

      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(updateMutationInputType)
          }
        }
      }
    }
    if (model.crudOptions.updateBy) {
      const operationType = GraphbackOperationType.UPDATE_BY
      const operation = getFieldName(name, operationType)

      const inputTypeName = getInputTypeName(name, operationType)
      const updateMutationInputType = schemaComposer.getITC(inputTypeName).getType()
      const filterInputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND)).getType()

      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          },
          input: {
            type: GraphQLNonNull(updateMutationInputType)
          }
        }
      }
    }
    if (model.crudOptions.delete) {
      const operationType = GraphbackOperationType.DELETE
      const operation = getFieldName(name, operationType)

      const inputTypeName = getInputTypeName(name, operationType)
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType()
      mutationFields[operation] = {
        type: modelType,
        args: {
          input: {
            type: GraphQLNonNull(deleteMutationInputType)
          }
        }
      }
    }
    if (model.crudOptions.deleteBy) {
      const operationType = GraphbackOperationType.DELETE_BY
      const operation = getFieldName(name, operationType)

      const inputTypeName = getInputTypeName(name, operationType)
      const deleteMutationInputType = schemaComposer.getITC(inputTypeName).getType()
      const filterInputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND)).getType()
      mutationFields[operation] = {
        type: resultListType,
        args: {
          filter: {
            type: filterInputType
          },
          input: {
            type: GraphQLNonNull(deleteMutationInputType)
          }
        }
      }
    }

    schemaComposer.Mutation.addFields(mutationFields)
  }

  protected createQueries (model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()
    const aggFields = {}
    const aggregations = ['count', 'avg', 'max', 'min', 'sum']
    aggregations.forEach(agg => {
      aggFields[agg] = {
        type: 'Int',
        args: {
          of: {
            type: `Of${name}Input`
          }
        },
        description: '@transient'
      }
    })
    modelTC.addFields(aggFields)

    buildFilterInputType(schemaComposer, modelType)

    const queryFields = {}
    if (model.crudOptions.findOne) {
      const operation = getFieldName(name, GraphbackOperationType.FIND_ONE)
      queryFields[operation] = {
        type: model.graphqlType,
        args: buildFindOneFieldMap(model, schemaComposer)
      }
    }
    if (model.crudOptions.find) {
      const operationType = GraphbackOperationType.FIND
      const operation = getFieldName(name, operationType)

      const inputTypeName = getInputTypeName(name, operationType)
      const filterInputType = schemaComposer.getITC(inputTypeName).getType()
      const resultListType = createModelListResultType(modelType)
      queryFields[operation] = {
        type: GraphQLNonNull(resultListType),
        args: {
          filter: {
            type: filterInputType
          },
          page: {
            type: PageRequest
          },
          orderBy: {
            type: OrderByInputType
          }
        }
      }
    }

    schemaComposer.Query.addFields(queryFields)
  }

  protected createAggregationForModelFields (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    for (const model of models) {
      const modelName = model.graphqlType.name
      const enumName = `Enum${modelName}Fields`
      const fields = Object.keys(model.fields).filter(field => {
        return !model.fields[field].transient
      }).join(' ')
      schemaComposer.createEnumTC(`enum ${enumName} { ${fields} }`)
      schemaComposer.createInputTC(`input Of${modelName}Input { of: ${enumName}}`)
    }
  }

  protected addVersionedMetadataFields (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    const timeStampInputName = getInputName(Timestamp)
    let timestampInputType: GraphQLInputObjectType
    let timestampType: GraphQLScalarType
    for (const model of models) {
      const name = model.graphqlType.name
      const modelTC = schemaComposer.getOTC(name)
      const desc = model.graphqlType.description
      const { markers } = metadataMap
      if (parseMetadata(markers.versioned, desc)) {
        const updateField = model.fields[metadataMap.fieldNames.updatedAt]
        const createAtField = model.fields[metadataMap.fieldNames.createdAt]
        const errorMessage = (field: string) => `Type "${model.graphqlType.name}" annotated with @versioned, cannot contain custom "${field}" field since it is generated automatically. Either remove the @versioned annotation, change the type of the field to "${Timestamp.name}" or remove the field.`

        if (createAtField && createAtField.type !== Timestamp.name) {
          throw new Error(errorMessage(metadataMap.fieldNames.createdAt))
        }

        if (updateField && updateField.type !== Timestamp.name) {
          throw new Error(errorMessage(metadataMap.fieldNames.updatedAt))
        }

        if (!timestampInputType) {
          if (schemaComposer.has(Timestamp.name)) {
            timestampInputType = schemaComposer.getITC(timeStampInputName).getType()
          } else {
            schemaComposer.createScalarTC(Timestamp)
            timestampInputType = createInputTypeForScalar(Timestamp)
            schemaComposer.add(timestampInputType)
          }

          timestampType = schemaComposer.getSTC(Timestamp.name).getType()
        }

        const metadataFields = createVersionedFields(timestampType)
        // metadata fields needed for @versioned

        modelTC.addFields(metadataFields)

        const inputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND))
        if (inputType) {
          const metadataInputFields = createVersionedInputFields(timestampInputType)
          inputType.addFields(metadataInputFields)
        }
      }
    };
  }

  /**
   *
   * Print schema as a string and format in one of the available languages
   *
   * @param {GraphQLSchema} schema
   * @param {string} fileExtension
   */
  protected transformSchemaToString (schema: GraphQLSchema, fileExtension: string) {
    const schemaString = printSchemaWithDirectives(schema)
    if (this.pluginConfig) {
      if (fileExtension === 'ts') {
        return tsSchemaFormatter.format(schemaString)
      }
      if (fileExtension === 'js') {
        return jsSchemaFormatter.format(schemaString)
      }
      if (fileExtension === 'graphql') {
        return gqlSchemaFormatter.format(schemaString)
      }
    }
    throw Error(`Invalid format '${fileExtension}' specified. \`options.format\` supports only \`ts\`, \`js\` and \`graphql\` flags`)
  }

  /**
   * Create Query resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IResolvers} resolvers - root resolver object
   */
  protected addQueryResolvers (model: ModelDefinition, resolvers: IResolvers) {
    if (model.crudOptions.findOne || model.crudOptions.find) {
      resolvers.Query = (resolvers.Query || {}) as IObjectTypeResolver

      if (model.crudOptions.findOne) {
        this.addFindOneQueryResolver(model, resolvers.Query)
      }
      if (model.crudOptions.find) {
        this.addFindQueryResolver(model, resolvers.Query)
      }
    }
  }

  /**
   * Create Mutation resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IResolvers} resolvers - root resolver object
   */
  protected addMutationResolvers (model: ModelDefinition, resolvers: IResolvers) {
    if (model.crudOptions.create || model.crudOptions.update || model.crudOptions.delete) {
      resolvers.Mutation = (resolvers.Mutation || {}) as IObjectTypeResolver

      if (model.crudOptions.create) {
        this.addCreateMutationResolver(model, resolvers.Mutation)
      }
      if (model.crudOptions.update) {
        this.addUpdateMutationResolver(model, resolvers.Mutation)
      }
      if (model.crudOptions.updateBy) {
        this.addUpdateByMutationResolver(model, resolvers.Mutation)
      }
      if (model.crudOptions.delete) {
        this.addDeleteMutationResolver(model, resolvers.Mutation)
      }
      if (model.crudOptions.deleteBy) {
        this.addDeleteByMutationResolver(model, resolvers.Mutation)
      }
    }
  }

  /**
   * Create Subscription resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IResolvers} resolvers - root resolver object
   */
  protected addSubscriptionResolvers (model: ModelDefinition, resolvers: IResolvers) {
    const modelType = model.graphqlType

    if (model.crudOptions.subCreate || model.crudOptions.subUpdate || model.crudOptions.subDelete) {
      resolvers.Subscription = (resolvers.Subscription || {}) as IObjectTypeResolver

      if (model.crudOptions.subCreate) {
        this.addCreateSubscriptionResolver(modelType, resolvers.Subscription)
      }
      if (model.crudOptions.subUpdate) {
        this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription)
      }
      if (model.crudOptions.subDelete) {
        this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription)
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
  protected addRelationshipResolvers (model: ModelDefinition, resolversObj: IResolvers, modelNameToModelDefinition: any) {
    const relationResolvers = {}
    for (const relationship of model.relationships) {
      if (relationship.kind === 'oneToMany') {
        this.addOneToManyResolver(relationship, relationResolvers, modelNameToModelDefinition)
      } else {
        this.addOneToOneResolver(relationship, relationResolvers, modelNameToModelDefinition)
      }
    }

    if (Object.keys(relationResolvers).length > 0) {
      resolversObj[model.graphqlType.name] = relationResolvers
    }
  }

  /**
   * Creates a Create mutation resolver field
   *
   * @param {ModelDefinition} model - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addCreateMutationResolver (model: ModelDefinition, mutationObj: IObjectTypeResolver) {
    const modelType = model.graphqlType
    const modelName = modelType.name
    const resolverCreateField = getFieldName(modelName, GraphbackOperationType.CREATE)

    mutationObj[resolverCreateField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].create(args.input, context, info)
    }
  }

  /**
   * Creates an Update mutation resolver
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addUpdateMutationResolver (model: ModelDefinition, mutationObj: IObjectTypeResolver) {
    const modelName = model.graphqlType.name
    const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE)

    mutationObj[updateField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].update(args.input, context, info)
    }
  }

  /**
   * Creates an UpdateBy mutation resolver
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addUpdateByMutationResolver (model: ModelDefinition, mutationObj: IObjectTypeResolver) {
    const modelName = model.graphqlType.name
    const updateField = getFieldName(modelName, GraphbackOperationType.UPDATE_BY)

    mutationObj[updateField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].updateBy(args, context, info)
    }
  }

  /**
   * Creates a Delete Mutation resolver field
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addDeleteMutationResolver (model: ModelDefinition, mutationObj: IObjectTypeResolver) {
    const modelName = model.graphqlType.name
    const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE)

    mutationObj[deleteField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].delete(args.input, context, info)
    }
  }

  /**
   * Creates a DeleteBy Mutation resolver field
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addDeleteByMutationResolver (model: ModelDefinition, mutationObj: IObjectTypeResolver) {
    const modelName = model.graphqlType.name
    const deleteField = getFieldName(modelName, GraphbackOperationType.DELETE_BY)

    mutationObj[deleteField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].deleteBy(args, context, info)
    }
  }

  /**
   * Creates a Find Query resolver field
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addFindQueryResolver (model: ModelDefinition, queryObj: IObjectTypeResolver) {
    const modelType = model.graphqlType
    const modelName = modelType.name
    const findField = getFieldName(modelName, GraphbackOperationType.FIND)

    queryObj[findField] = async (_: any, args: FindByArgs, context: GraphbackContext, info: GraphQLResolveInfo) => {
      return await context.graphback[modelName].findBy(args, context, info, 'items')
    }
  }

  /**
   * Creates a FindOne Query resolver
   *
   * @param {ModelDefinition} model - Model definition object
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addFindOneQueryResolver (model: ModelDefinition, queryObj: IObjectTypeResolver) {
    const modelType = model.graphqlType
    const modelName = modelType.name
    const findOneField = getFieldName(modelName, GraphbackOperationType.FIND_ONE)
    const primaryKeyLabel = model.primaryKey.name

    queryObj[findOneField] = (_: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].findOne({ [primaryKeyLabel]: args.id }, context, info)
    }
  }

  /**
   * Creates a Create Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addCreateSubscriptionResolver (modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver) {
    const modelName = modelType.name
    const operation = getSubscriptionName(modelName, GraphbackOperationType.CREATE)

    subscriptionObj[operation] = {
      subscribe: (_: any, args: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`)
        }

        return context.graphback[modelName].subscribeToCreate(args.filter, context)
      }
    }
  }

  /**
   * Creates an Update Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addUpdateSubscriptionResolver (modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver) {
    const modelName = modelType.name
    const operation = getSubscriptionName(modelName, GraphbackOperationType.UPDATE)

    subscriptionObj[operation] = {
      subscribe: (_: any, args: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`)
        }

        return context.graphback[modelName].subscribeToUpdate(args.filter, context)
      }
    }
  }

  /**
   * Creates a Delete Subscription resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IFieldResolver} mutationObj - Mutation resolver object
   */
  protected addDeleteSubscriptionResolver (modelType: GraphQLObjectType, subscriptionObj: IObjectTypeResolver) {
    const modelName = modelType.name
    const operation = getSubscriptionName(modelName, GraphbackOperationType.DELETE)

    subscriptionObj[operation] = {
      subscribe: (_: any, args: any, context: GraphbackContext) => {
        if (!context.graphback || !context.graphback[modelName]) {
          throw new Error(`Missing service for ${modelName}`)
        }

        return context.graphback[modelName].subscribeToDelete(args.filter, context)
      }
    }
  }

  /**
   * Creates a OneToMany Relationship resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IResolvers} resolverObj - Resolvers object
   * @param modelNameToModelDefinition - model type name to its definition for quick search
   */
  protected addOneToManyResolver (relationship: FieldRelationshipMetadata, resolverObj: IResolvers, modelNameToModelDefinition: any) {
    const modelName = relationship.relationType.name
    const relationOwner = relationship.ownerField.name
    const model = modelNameToModelDefinition[modelName]

    resolverObj[relationOwner] = (parent: any, args: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner]
      }

      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      return context.graphback[modelName].batchLoadData(
        relationship.relationForeignKey,
        parent[model.primaryKey.name],
        args.filter,
        context,
        info
      )
    }
  }

  /**
   * Creates a OneToOne/ManyToOne Relationship resolver field
   *
   * @param {GraphQLObjectType} modelType - Model GraphQL object type
   * @param {IResolvers} resolverObj - Resolvers object
   * @param modelNameToModelDefinition - model type name to its definition for quick search
   */
  protected addOneToOneResolver (relationship: FieldRelationshipMetadata, resolverObj: IResolvers, modelNameToModelDefinition: any) {
    const modelName = relationship.relationType.name
    const relationIdField = getPrimaryKey(relationship.relationType)
    const relationOwner = relationship.ownerField.name
    const model = modelNameToModelDefinition[modelName]

    resolverObj[relationOwner] = (parent: any, _: any, context: GraphbackContext, info: GraphQLResolveInfo) => {
      if (Object.keys(parent).includes(relationOwner)) {
        return parent[relationOwner]
      }

      if (!context.graphback || !context.graphback[modelName]) {
        throw new Error(`Missing service for ${modelName}`)
      }

      const selectedFields = getSelectedFieldsFromResolverInfo(info, model)
      selectedFields.push(relationIdField.name)

      const fetchedKeys = selectedFields.join('-')

      // construct a unique key to identify the dataloader
      const dataLoaderName = `${modelName}-${relationship.kind}-${relationIdField.name}-${relationship.relationForeignKey}-${fetchedKeys}-DataLoader`

      if (!context[dataLoaderName]) {
        context[dataLoaderName] = new DataLoader<string, any>(async (keys: string[]) => {
          const service = context.graphback[modelName]
          const results = await service.findBy({ [relationIdField.name]: { in: keys } }, context, info)

          return keys.map((key: string) => {
            return results.items.find((item: any) => item[relationIdField.name].toString() === key.toString())
          })
        })
      }

      const relationForeignKey = parent[relationship.relationForeignKey]

      // eslint-disable-next-line no-null/no-null
      if (relationForeignKey === undefined || relationForeignKey === null) {
        // eslint-disable-next-line no-null/no-null
        return null
      }

      return context[dataLoaderName].load(relationForeignKey)
    }
  }

  private createSchemaCRUDTypes (schemaComposer: SchemaComposer<any>) {
    schemaComposer.add(PageRequest)
    schemaComposer.add(IDScalarInputType)
    schemaComposer.add(SortDirectionEnum)
    schemaComposer.add(StringScalarInputType)
    schemaComposer.add(BooleanScalarInputType)
    schemaComposer.add(createInputTypeForScalar(GraphQLInt))
    schemaComposer.add(createInputTypeForScalar(GraphQLFloat))

    schemaComposer.forEach((tc: NamedTypeComposer<any>) => {
      const namedType = tc.getType()
      if (isScalarType(namedType) && !isSpecifiedScalarType(namedType) && FILTER_SUPPORTED_SCALARS.includes(namedType.name)) {
        schemaComposer.add(createInputTypeForScalar(namedType))

        return
      }

      const isRootType = ['Query', 'Subscription', 'Mutation'].includes(namedType.name)
      if (isObjectType(namedType) && !isModelType(namedType) && !isRootType) {
        addCreateObjectInputType(schemaComposer, namedType)
        addUpdateObjectInputType(schemaComposer, namedType)
      }
    })
  }

  /**
   * Add relationship fields to GraphQL model types
   *
   * @param schema
   * @param models
   */
  private buildSchemaModelRelationships (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    // create or update relationship fields to the model types.
    for (const model of models) {
      const modifiedType = schemaComposer.getOTC(model.graphqlType.name)

      addRelationshipFields(model, modifiedType)
      extendRelationshipFields(model, modifiedType)
    }
  }
}
