
var Genre_possibleTypes = ['Genre']
module.exports.isGenre = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGenre"')
  return Genre_possibleTypes.includes(obj.__typename)
}



var Movie_possibleTypes = ['Movie']
module.exports.isMovie = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMovie"')
  return Movie_possibleTypes.includes(obj.__typename)
}



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
