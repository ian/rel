"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolverInfoFieldsList = exports.getModelFieldsFromResolverFields = exports.getSelectedFieldsFromResolverInfo = void 0;
const graphql_fields_list_1 = require("graphql-fields-list");
/**
 * Find selectable fields from resolve info for a given model starting on a given path
 * @param info - the resolver info object
 * @param model - the model to find the fields from
 * @param path - the root path to start field resolution from.
 */
const getSelectedFieldsFromResolverInfo = (info, model, path) => {
    const resolverFields = Object.keys(graphql_fields_list_1.fieldsMap(info, { path }));
    return exports.getModelFieldsFromResolverFields(resolverFields, model);
};
exports.getSelectedFieldsFromResolverInfo = getSelectedFieldsFromResolverInfo;
/**
 * Get the model specific-fields from a full list of fields
 *
 * @param {string[]} resolverFields - resolver field names
 * @param {ModelDefinition} model - Graphback model
 */
const getModelFieldsFromResolverFields = (resolverFields, model) => {
    const selectedFields = new Set();
    for (const key of resolverFields) {
        const correspondingFieldInDatabase = model.fields[key];
        if (correspondingFieldInDatabase && !correspondingFieldInDatabase.transient) {
            selectedFields.add(correspondingFieldInDatabase.name);
        }
    }
    return [...selectedFields];
};
exports.getModelFieldsFromResolverFields = getModelFieldsFromResolverFields;
/**
 * Find fields list of resolver info starting at a given path.
 * If path is undefined, return top level fields information.
 * @param info - the resolver info object
 * @param path - the root path to start field resolution from
 */
const getResolverInfoFieldsList = (info, path) => graphql_fields_list_1.fieldsList(info, { path });
exports.getResolverInfoFieldsList = getResolverInfoFieldsList;
//# sourceMappingURL=getSelectedFieldsFromResolverInfo.js.map