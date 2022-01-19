import { mergeResolvers } from '@graphql-tools/merge'
import { GraphQLObjectType, GraphQLSchema, getNamedType } from 'graphql'
import { getUserTypesFromSchema, IResolvers } from '@graphql-tools/utils'
import { RelationshipMetadataBuilder, FieldRelationshipMetadata } from '../relationships/RelationshipMetadataBuilder'
import { ModelDefinition, ModelFieldMap } from './ModelDefinition'

/**
 * Contains Graphback Core Models
 */
export class GraphbackCoreMetadata {
  private schema: GraphQLSchema
  private resolvers: IResolvers
  private models: ModelDefinition[]

  public constructor (schema: GraphQLSchema) {
    this.schema = schema
  }

  public getSchema () {
    return this.schema
  }

  public setSchema (newSchema: GraphQLSchema) {
    this.schema = newSchema
  }

  public addResolvers (resolvers: IResolvers) {
    if (resolvers) {
      const mergedResolvers = [
        this.resolvers,
        resolvers
      ]
      this.resolvers = mergeResolvers(mergedResolvers)
    }
  }

  public getResolvers (): IResolvers {
    return this.resolvers
  }

  /**
   * Get Graphback Models - GraphQL Types with additional CRUD configuration
   */
  public getModelDefinitions () {
    // Contains map of the models with their underlying CRUD configuration
    this.models = []
    // Get actual user types
    const modelTypes = this.getGraphQLTypesWithModel()

    for (const modelType of modelTypes) {
      const model = this.buildModel(modelType)
      this.models.push(model)
    }

    return this.models
  }

  /**
   * Helper for plugins to fetch all types that should be processed by Graphback plugins.
   * To mark type as enabled for graphback generators we need to add `model` annotations over the type.
   *
   * Returns all user types that have @model in description
   * @param schema
   */
  public getGraphQLTypesWithModel (): GraphQLObjectType[] {
    return getUserTypesFromSchema(this.schema)
  }

  private buildModel (modelType: GraphQLObjectType): ModelDefinition {
    // Merge CRUD options from type with global ones
    const primaryKey = {
      name: "__id",
      type: "ID"
    }
    // parse fields
    const modelFields = modelType.getFields()
    const fields: ModelFieldMap = {}

    fields.__id = {
      type: "ID"
    }

    const uniqueFields = []

    for (const field of Object.keys(modelFields)) {
      let fieldName = field
      let type: string = ''

      const graphqlField = modelFields[field]

      if (graphqlField.extensions?.directives?.transient) {
        fields[field] = {
          name: field,
          transient: true,
          type: getNamedType(graphqlField.type).name
        }
        continue
      }

      if (graphqlField.extensions?.directives?.unique) {
        uniqueFields.push(field)
      }

      type = getNamedType(modelFields[field].type).name

      fields[field] = {
        name: fieldName,
        type,
        transient: false
      }
    }

    return {
      fields,
      primaryKey,
      relationships: [],
      uniqueFields,
      graphqlType: modelType
    }
  }
}
