import { GraphQLField, GraphQLObjectType, getNamedType, isScalarType, GraphQLInputField } from 'graphql'

/**
 * Returns the primary key field of a GraphQL object.
 * @param graphqlType
 */
export function getPrimaryKey (graphqlType: GraphQLObjectType): GraphQLField<any, any> {
  const fields = Object.values(graphqlType.getFields())

  const autoPrimaryKeyFromScalar: Array<GraphQLField<any, any>> = []
  for (const field of fields) {
    if (isAutoPrimaryKey(field)) {
      autoPrimaryKeyFromScalar.push(field)
    }
  }

  if (autoPrimaryKeyFromScalar.length > 1) {
    throw new Error(`${graphqlType.name} type should not have two potential primary keys.`)
  }

  const primaryKey = autoPrimaryKeyFromScalar.shift()

  if (!primaryKey) {
    throw new Error(`${graphqlType.name} type has no primary field.`)
  }

  return primaryKey
}

/**
 * Check if a GraphQLField can be inferred as a primary key, specific for each database:
 * A field is a potential primary key if:
 * - is named "_id" and has type "ID", auto increment primary key for relational database
 * @param field
 */
export function isAutoPrimaryKey (field: GraphQLField<any, any> | GraphQLInputField): boolean {
  const { type, name: fieldName } = field
  const baseType = getNamedType(type)
  const name = baseType.name

  return fieldName === '_id' && name === 'ID' && isScalarType(baseType)
}
