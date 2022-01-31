import { mergeResolvers } from '@graphql-tools/merge'
import { GraphQLObjectType, GraphQLSchema, getNamedType, isListType } from 'graphql'
import { getUserTypesFromSchema, IResolvers } from '@graphql-tools/utils'
import { ModelDefinition, ModelFieldMap } from './ModelDefinition'

/**
 * Contains Graphback Core Models
 */
export class GraphbackCoreMetadata {
  private schema: GraphQLSchema
  private resolvers: IResolvers
  private models: ModelDefinition[]

  public constructor(schema: GraphQLSchema) {
    this.schema = schema
  }

  public getSchema() {
    return this.schema
  }

  public setSchema(newSchema: GraphQLSchema) {
    this.schema = newSchema
  }

  public addResolvers(resolvers: IResolvers) {
    if (resolvers) {
      const mergedResolvers = [
        this.resolvers,
        resolvers
      ]
      this.resolvers = mergeResolvers(mergedResolvers)
    }
  }

  public getResolvers(): IResolvers {
    return this.resolvers
  }

  /**
   * Get Graphback Models - GraphQL Types with additional CRUD configuration
   */
  public getModelDefinitions() {
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
  public getGraphQLTypesWithModel(): GraphQLObjectType[] {
    return getUserTypesFromSchema(this.schema)
  }

  private buildModel(modelType: GraphQLObjectType): ModelDefinition {
    // Merge CRUD options from type with global ones
    const primaryKey = {
      name: "_id",
      type: "ID"
    }
    // parse fields
    const modelFields = modelType.getFields()
    const fields: ModelFieldMap = {}

    fields._id = {
      type: "ID",
      name: "_id",
      transient: false
    }

    const uniqueFields = []
    const defaultFields = []
    const computedFields = []
    const relationships = []

    for (const field of Object.keys(modelFields)) {
      const graphqlField = modelFields[field]
      const type = getNamedType(graphqlField.type).name

      if (graphqlField.extensions?.directives?.some?.(d => d.name === "transient")) {
        fields[field] = {
          name: field,
          transient: true,
          type
        }
        continue
      }

      fields[field] = {
        name: field,
        type,
        transient: false
      }

      if (graphqlField.extensions?.directives?.some?.(d => d.name === "unique")) {
        uniqueFields.push(field)
      }

      const defaultField = graphqlField.extensions?.directives?.find?.(d => d.name === "default")
      if (defaultField) {
        let parsedDefaultValue = defaultField.args.value
        switch (type) {
          case 'String':
            break;
          case 'Boolean':
            parsedDefaultValue = Boolean(parsedDefaultValue);
            break;
          case 'Int':
          case 'Float':
            parsedDefaultValue = Number(parsedDefaultValue);
            break;
          default:
            try {
              parsedDefaultValue = JSON.parse(parsedDefaultValue);
            } catch {
              // do nothing, assume the existing value
            }
        }
        defaultFields.push({
          name: field,
          default: parsedDefaultValue
        })
      }

      const computedField = graphqlField.astNode.directives?.find?.(d => d.name.value === "computed")
      if (computedField) {
        fields[field].computed = true
        computedFields.push({
          name: field,
          type,
          template: computedField.arguments?.find(a => a.name.value === "value")?.value?.value
        })
      }

      const relationField = graphqlField.astNode.directives?.find?.(d => d.name.value === "relation")
      if (relationField) {
        relationships.push({
          type: relationField.arguments?.find(a => a.name.value === "type")?.value?.value,
          field,
          isList: isListType(graphqlField.type),
          fieldType: type,
          direction: relationField.arguments?.find(a => a.name.value === "direction")?.value?.value
        })
      }
    }

    return {
      fields,
      primaryKey,
      relationships,
      uniqueFields,
      defaultFields,
      computedFields,
      graphqlType: modelType
    }
  }
}
