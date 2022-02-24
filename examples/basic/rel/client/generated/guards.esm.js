
var Genre_possibleTypes = ['Genre']
export var isGenre = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGenre"')
  return Genre_possibleTypes.includes(obj.__typename)
}



var Movie_possibleTypes = ['Movie']
export var isMovie = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMovie"')
  return Movie_possibleTypes.includes(obj.__typename)
}



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
