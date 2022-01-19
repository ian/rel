
var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var Subscription_possibleTypes = ['Subscription']
module.exports.isSubscription = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var UserMutationResultList_possibleTypes = ['UserMutationResultList']
module.exports.isUserMutationResultList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserMutationResultList"')
  return UserMutationResultList_possibleTypes.includes(obj.__typename)
}



var UserResultList_possibleTypes = ['UserResultList']
module.exports.isUserResultList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserResultList"')
  return UserResultList_possibleTypes.includes(obj.__typename)
}
