/* eslint-disable max-lines */
import { resolve, dirname, join } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { SchemaComposer, NamedTypeComposer } from 'graphql-compose'
import { IResolvers, IObjectTypeResolver } from '@graphql-tools/utils'
import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLFloat, isScalarType, isSpecifiedScalarType, GraphQLResolveInfo, isObjectType, GraphQLInputObjectType, GraphQLScalarType } from 'graphql'
import { Timestamp, getFieldName, printSchemaWithDirectives, getSubscriptionName, GraphbackCoreMetadata, GraphbackOperationType, GraphbackPlugin, ModelDefinition, getInputTypeName, GraphbackContext, graphbackScalarsTypes, FILTER_SUPPORTED_SCALARS, FindByArgs } from '@graphback/core'
import { gqlSchemaFormatter, jsSchemaFormatter, tsSchemaFormatter } from './writer/schemaFormatters'
import { buildOrderByInputType,buildFilterInputType, createModelListResultType, StringScalarInputType, BooleanScalarInputType, SortDirectionEnum, buildCreateMutationInputType, buildFindOneFieldMap, buildMutationInputType, buildSubscriptionFilterType, IDScalarInputType, PageRequest, createInputTypeForScalar, createVersionedFields, createVersionedInputFields, addCreateObjectInputType, addUpdateObjectInputType, getInputName, createMutationListResultType } from './definitions/schemaDefinitions'

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
    this.buildSchemaForModels(schemaComposer, models)
    this.addMetadataFields(schemaComposer, models)
    
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
      const modelName = model.graphqlType.name
      let modifiedType = schemaComposer.getOTC(modelName)
      const errorMessage = (field: string) => `${modelName} cannot contain custom "${field}" field since it is generated automatically.`

      if(model.fields.id) {
        throw new Error(errorMessage("id"))
      }

      if(model.fields.__unique) {
        throw new Error(errorMessage("__unique"))
      }

      modifiedType.addFields({
        _id: {
          type: "ID"
        }
      })
      this.createQueries(model, schemaComposer)
      this.createMutations(model, schemaComposer)
      this.createSubscriptions(model, schemaComposer)
      modifiedType = schemaComposer.getOTC(modelName)
    }
  }

  protected createSubscriptions (model: ModelDefinition, schemaComposer: SchemaComposer<any>) {
    const name = model.graphqlType.name
    const modelTC = schemaComposer.getOTC(name)
    const modelType = modelTC.getType()

    buildSubscriptionFilterType(schemaComposer, modelType)

    const subscriptionFields = {}
    let operation = getSubscriptionName(name, GraphbackOperationType.CREATE)

    let filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_CREATE)
    const subCreateFilterInputType = schemaComposer.getITC(filterInputName).getType()

    subscriptionFields[operation] = {
      type: GraphQLNonNull(modelType),
      args: {
        filter: {
          type: subCreateFilterInputType
        }
      }
    }
  
    operation = getSubscriptionName(name, GraphbackOperationType.UPDATE)

    filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_UPDATE)
    const subUpdateFilterInputType = schemaComposer.getITC(filterInputName).getType()

    subscriptionFields[operation] = {
      type: GraphQLNonNull(modelType),
      args: {
        filter: {
          type: subUpdateFilterInputType
        }
      }
    }
  
    operation = getSubscriptionName(name, GraphbackOperationType.DELETE)

    filterInputName = getInputTypeName(name, GraphbackOperationType.SUBSCRIPTION_DELETE)
    const subDeleteFilterInputType = schemaComposer.getITC(filterInputName).getType()

    subscriptionFields[operation] = {
      type: GraphQLNonNull(modelType),
      args: {
        filter: {
          type: subDeleteFilterInputType
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
    let operationType = GraphbackOperationType.CREATE

    buildCreateMutationInputType(schemaComposer, modelType)

    let inputTypeName = getInputTypeName(name, operationType)
    const createMutationInputType = schemaComposer.getITC(inputTypeName).getType()

    let operation = getFieldName(name, operationType)
    mutationFields[operation] = {
      type: modelType,
      args: {
        input: {
          type: GraphQLNonNull(createMutationInputType)
        }
      }
    }
    operationType = GraphbackOperationType.UPDATE
    operation = getFieldName(name, operationType)

    inputTypeName = getInputTypeName(name, operationType)
    let updateMutationInputType = schemaComposer.getITC(inputTypeName).getType()

    mutationFields[operation] = {
      type: modelType,
      args: {
        input: {
          type: GraphQLNonNull(updateMutationInputType)
        }
      }
    }
    operationType = GraphbackOperationType.UPDATE_BY
    operation = getFieldName(name, operationType)

    inputTypeName = getInputTypeName(name, operationType)
    updateMutationInputType = schemaComposer.getITC(inputTypeName).getType()
    let filterInputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND)).getType()

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
  
    operationType = GraphbackOperationType.DELETE
    operation = getFieldName(name, operationType)

    inputTypeName = getInputTypeName(name, operationType)
    mutationFields[operation] = {
      type: modelType,
      args: buildFindOneFieldMap(model, schemaComposer)
    }
  
    operationType = GraphbackOperationType.DELETE_BY
    operation = getFieldName(name, operationType)

    inputTypeName = getInputTypeName(name, operationType)
    filterInputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND)).getType()
    mutationFields[operation] = {
      type: resultListType,
      args: {
        filter: {
          type: filterInputType
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
    const aggregations = ['avg', 'max', 'min', 'sum']
    aggFields.count = {
      type: 'Int',
      args: {
        of: {
          type: `Of${name}Input`
        },
        distinct: {
          type: "Boolean"
        }
      },
      extensions: {
        directives: {
          transient: {}
        }
      }
    }
    if(schemaComposer.has(`Of${name}NumberInput`)) {
      aggregations.forEach(agg => {
        aggFields[agg] = {
          type: 'Int',
          args: {
            of: {
              type: `Of${name}NumberInput`
            },
            distinct: {
              type: "Boolean"
            }
          },
          extensions: {
            directives: {
              transient: {}
            }
          }
        }
      })
    }
    modelTC.addFields(aggFields)

    buildFilterInputType(schemaComposer, modelType)

    const queryFields = {}
    let operation = getFieldName(name, GraphbackOperationType.FIND_ONE)
    queryFields[operation] = {
      type: model.graphqlType,
      args: buildFindOneFieldMap(model, schemaComposer)
    }
    
    const operationType = GraphbackOperationType.FIND
    operation = getFieldName(name, operationType)

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
          type: [buildOrderByInputType(name)]
        }
      }
    }

    schemaComposer.Query.addFields(queryFields)
  }

  protected createAggregationForModelFields (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    for (const model of models) {
      const modelName = model.graphqlType.name
      const enumName = `${modelName}FieldsEnum`
      const numberEnumName = `${modelName}NumberFieldsEnum`
      const fieldKeys = Object.keys(model.fields)
      const fields = fieldKeys.filter(f => !model.fields[f].transient && !model.fields[f].computed).join(' ')
      const numberTypes = ["Int", "Float","BigInt", "NonPositiveFloat", "NonPositiveInt", "NonNegativeInt", 
      "NonNegativeFloat", "NegativeFloat", "NegativeInt", "PositiveInt", "PositiveFloat"]
      const numberFields = fieldKeys.filter(f => {
        return !model.fields[f].transient && !model.fields[f].computed && numberTypes.includes(model.fields[f].type.replace("!", ""))
      }).join(' ')
      schemaComposer.createEnumTC(`enum ${enumName} { ${fields} createdAt updatedAt }`)
      schemaComposer.createInputTC(`input Of${modelName}Input { of: ${enumName}}`)
      if(numberFields !== '') {
        schemaComposer.createEnumTC(`enum ${numberEnumName} { ${numberFields} }`)
        schemaComposer.createInputTC(`input Of${modelName}NumberInput { of: ${numberEnumName}}`)
      }
    }
  }

  protected addMetadataFields (schemaComposer: SchemaComposer<any>, models: ModelDefinition[]) {
    const timeStampInputName = getInputName(Timestamp)
    let timestampInputType: GraphQLInputObjectType
    let timestampType: GraphQLScalarType
    for (const model of models) {
      const name = model.graphqlType.name
      const modelTC = schemaComposer.getOTC(name)
      const updateField = model.fields.updatedAt
      const createAtField = model.fields.createdAt
      const errorMessage = (field: string) => `${name} cannot contain custom "${field}" field since it is generated automatically.`

      if (createAtField) {
        throw new Error(errorMessage("createdAt"))
      }

      if (updateField) {
        throw new Error(errorMessage("updatedAt"))
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
     
      modelTC.addFields(metadataFields)

      const inputType = schemaComposer.getITC(getInputTypeName(name, GraphbackOperationType.FIND))
      if (inputType) {
        const metadataInputFields = createVersionedInputFields(timestampInputType)
        inputType.addFields(metadataInputFields)
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
    resolvers.Query = (resolvers.Query || {}) as IObjectTypeResolver

    this.addFindOneQueryResolver(model, resolvers.Query)
    this.addFindQueryResolver(model, resolvers.Query)
  }

  /**
   * Create Mutation resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IResolvers} resolvers - root resolver object
   */
  protected addMutationResolvers (model: ModelDefinition, resolvers: IResolvers) {
    resolvers.Mutation = (resolvers.Mutation || {}) as IObjectTypeResolver
    this.addCreateMutationResolver(model, resolvers.Mutation)
    this.addUpdateMutationResolver(model, resolvers.Mutation)
    this.addUpdateByMutationResolver(model, resolvers.Mutation)
    this.addDeleteMutationResolver(model, resolvers.Mutation)
    this.addDeleteByMutationResolver(model, resolvers.Mutation)
  }

  /**
   * Create Subscription resolver fields
   *
   * @param {ModelDefinition} model - The model definition with CRUD config and GraphQL typr
   * @param {IResolvers} resolvers - root resolver object
   */
  protected addSubscriptionResolvers (model: ModelDefinition, resolvers: IResolvers) {
    const modelType = model.graphqlType
    resolvers.Subscription = (resolvers.Subscription || {}) as IObjectTypeResolver
    this.addCreateSubscriptionResolver(modelType, resolvers.Subscription)
    this.addUpdateSubscriptionResolver(modelType, resolvers.Subscription)
    this.addDeleteSubscriptionResolver(modelType, resolvers.Subscription)
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

      return context.graphback[modelName].delete(args, context, info)
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
      if (isObjectType(namedType) && !isRootType) {
        addCreateObjectInputType(schemaComposer, namedType)
        addUpdateObjectInputType(schemaComposer, namedType)
      }
    })
  }
}
