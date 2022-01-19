
var Mutation_possibleTypes = ['Mutation']
export var isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
export var isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Subscription_possibleTypes = ['Subscription']
export var isSubscription = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
export var isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var UserMutationResultList_possibleTypes = ['UserMutationResultList']
export var isUserMutationResultList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserMutationResultList"')
  return UserMutationResultList_possibleTypes.includes(obj.__typename)
}



var UserResultList_possibleTypes = ['UserResultList']
export var isUserResultList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserResultList"')
  return UserResultList_possibleTypes.includes(obj.__typename)
}
