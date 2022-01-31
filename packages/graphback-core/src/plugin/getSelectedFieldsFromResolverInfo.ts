import { GraphQLResolveInfo } from 'graphql'
import graphqlFields from 'graphql-fields'
import { fieldsList } from "graphql-fields-list"
import { ModelDefinition } from './ModelDefinition'

/**
 * Find selectable fields from resolve info for a given model starting on a given path
 * @param info - the resolver info object
 * @param model - the model to find the fields from
 * @param path - the root path to start field resolution from.
 */
export const getSelectedFieldsFromResolverInfo = (info: GraphQLResolveInfo, model: ModelDefinition, isMutation = false, path?: string): string[] => {
  let projectionObj = graphqlFields(info, {}, { processArguments: true })
  if (path) {
    projectionObj = projectionObj[path]
  }
  const resolverFields = Object.keys(projectionObj)
  const fieldArgs = {}
  if (!isMutation) {
    resolverFields.forEach(k => {
      if (projectionObj[k].__arguments) {
        fieldArgs[k] = projectionObj[k].__arguments
      }
    })
  }

  return getModelFieldsFromResolverFields(resolverFields, fieldArgs, model)
}

/**
 * Get the model specific-fields from a full list of fields
 *
 * @param {string[]} resolverFields - resolver field names
 * @param {ModelDefinition} model - Graphback model
 */
export const getModelFieldsFromResolverFields = (resolverFields: string[], fieldArgs: any, model: ModelDefinition): any => {
  const selectedFields = new Set<string>()

  for (const key of resolverFields) {
    const correspondingFieldInDatabase = model.fields[key]
    if (correspondingFieldInDatabase && !correspondingFieldInDatabase.transient) {
      selectedFields.add(correspondingFieldInDatabase.name)
    }
  }

  return [[...selectedFields], fieldArgs]
}

/**
 * Find fields list of resolver info starting at a given path.
 * If path is undefined, return top level fields information.
 * @param info - the resolver info object
 * @param path - the root path to start field resolution from
 */
export const getResolverInfoFieldsList = (info: GraphQLResolveInfo, path?: string) => {
  let projectionObj = graphqlFields(info, {}, { processArguments: true })
  if (path) {
    projectionObj = projectionObj[path]
  }
  return Object.keys(projectionObj)
}
