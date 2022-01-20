import { GraphQLObjectType } from 'graphql'

/**
 * Describe the name and type of primary key
 */
export interface FieldDescriptor {
  name: string
  type: string
  transient?: boolean | undefined
  computed?: boolean | undefined
}

export interface ModelFieldMap {
  [key: string]: FieldDescriptor
}

/**
 * Used to encapsulate configuration for the type
 */
export interface ModelDefinition {
  primaryKey: FieldDescriptor
  fields: ModelFieldMap
  graphqlType: GraphQLObjectType
  relationships: string[]
  uniqueFields: string[]
  defaultFields: any[]
  computedFields: any[] 
}

export function getModelByName (name: string, models: ModelDefinition[]): ModelDefinition | undefined {
  if (!models) {
    return undefined
  }

  return models.find((m: ModelDefinition) => m.graphqlType.name === name)
}
