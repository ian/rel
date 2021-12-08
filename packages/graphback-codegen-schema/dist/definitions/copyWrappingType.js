"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyWrappingType = void 0;
const graphql_1 = require("graphql");
/**
 * Copies the wrapping type(s) from one GraphQLType to another
 *
 * @param {GraphQLType} copyFromType - Get the wrapping types from this type
 * @param {GraphQLType} copyToType - Add the wrapping types to this type
 */
function copyWrappingType(copyFromType, copyToType) {
    const wrappers = [];
    let oldTypeCopy = copyFromType;
    while (graphql_1.isWrappingType(oldTypeCopy)) {
        if (graphql_1.isListType(oldTypeCopy)) {
            wrappers.push('GraphQLList');
        }
        else {
            wrappers.push('GraphQLNonNull');
        }
        oldTypeCopy = oldTypeCopy.ofType;
    }
    let namedNewType = graphql_1.getNamedType(copyToType);
    while (wrappers.length > 0) {
        const wrappingType = wrappers.pop();
        if (wrappingType === 'GraphQLList') {
            namedNewType = graphql_1.GraphQLList(namedNewType);
        }
        else {
            namedNewType = graphql_1.GraphQLNonNull(namedNewType);
        }
    }
    return namedNewType;
}
exports.copyWrappingType = copyWrappingType;
//# sourceMappingURL=copyWrappingType.js.map