import { parseMetadata } from 'graphql-metadata';
/**
 *  Return true if the GraphQL field has a @transient annotation
 *
 * @param {GraphQLField} field
 */
export function isTransientField(field) {
    return parseMetadata('transient', field);
}
//# sourceMappingURL=isTransientField.js.map