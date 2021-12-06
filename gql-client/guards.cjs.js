
var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Note_possibleTypes = ['Note']
module.exports.isNote = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isNote"')
  return Note_possibleTypes.includes(obj.__typename)
}



var NoteResultList_possibleTypes = ['NoteResultList']
module.exports.isNoteResultList = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isNoteResultList"')
  return NoteResultList_possibleTypes.includes(obj.__typename)
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
