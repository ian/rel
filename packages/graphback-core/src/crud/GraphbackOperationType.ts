
/**
 * Enum with list of possible resolvers that can be created
 */
/* eslint-disable no-shadow */
export enum GraphbackOperationType {
  CREATE = 'create',
  UPDATE = 'update',
  UPDATE_BY = 'updateBy',
  FIND = 'find',
  FIND_ONE = 'findOne',
  DELETE = 'delete',
  DELETE_BY = 'deleteBy',
  SUBSCRIPTION_CREATE = 'subCreate',
  SUBSCRIPTION_UPDATE = 'subUpdate',
  SUBSCRIPTION_DELETE = 'subDelete'
}
/* eslint-enable no-shadow */