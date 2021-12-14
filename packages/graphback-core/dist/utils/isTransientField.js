"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransientField = void 0;
const graphql_metadata_1 = require("graphql-metadata");
/**
 *  Return true if the GraphQL field has a @transient annotation
 *
 * @param {GraphQLField} field
 */
function isTransientField(field) {
    return graphql_metadata_1.parseMetadata('transient', field);
}
exports.isTransientField = isTransientField;
//# sourceMappingURL=isTransientField.js.map