import {
  linkTypeMap,
  createClient as createClientOriginal,
  generateGraphqlOperation,
  assertSameVersion,
} from '@genql/runtime'
import types from './types.esm'
var typeMap = linkTypeMap(types)
export * from './guards.esm'

export var version = '2.9.0'
assertSameVersion(version)

export var createClient = function(options) {
  options = options || {}
  var optionsCopy = {
    url: undefined,
    queryRoot: typeMap.Query,
    mutationRoot: typeMap.Mutation,
    subscriptionRoot: typeMap.Subscription,
  }
  for (var name in options) {
    optionsCopy[name] = options[name]
  }
  return createClientOriginal(optionsCopy)
}

export const enumPostFieldsEnum = {
  _id: '_id',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

export const enumRelDirection = {
  IN: 'IN',
  OUT: 'OUT',
}

export const enumSortDirectionEnum = {
  DESC: 'DESC',
  ASC: 'ASC',
}

export const enumUserFieldsEnum = {
  _id: '_id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}

export var generateQueryOp = function(fields) {
  return generateGraphqlOperation('query', typeMap.Query, fields)
}
export var generateMutationOp = function(fields) {
  return generateGraphqlOperation('mutation', typeMap.Mutation, fields)
}
export var generateSubscriptionOp = function(fields) {
  return generateGraphqlOperation('subscription', typeMap.Subscription, fields)
}
export var everything = {
  __scalar: true,
}