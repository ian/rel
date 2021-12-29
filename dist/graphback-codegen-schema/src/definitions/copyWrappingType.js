import { isWrappingType, GraphQLNonNull, isListType, GraphQLList, getNamedType } from 'graphql';
/**
 * Copies the wrapping type(s) from one GraphQLType to another
 *
 * @param {GraphQLType} copyFromType - Get the wrapping types from this type
 * @param {GraphQLType} copyToType - Add the wrapping types to this type
 */
export function copyWrappingType(copyFromType, copyToType) {
    const wrappers = [];
    let oldTypeCopy = copyFromType;
    while (isWrappingType(oldTypeCopy)) {
        if (isListType(oldTypeCopy)) {
            wrappers.push('GraphQLList');
        }
        else {
            wrappers.push('GraphQLNonNull');
        }
        oldTypeCopy = oldTypeCopy.ofType;
    }
    let namedNewType = getNamedType(copyToType);
    while (wrappers.length > 0) {
        const wrappingType = wrappers.pop();
        if (wrappingType === 'GraphQLList') {
            namedNewType = GraphQLList(namedNewType);
        }
        else {
            namedNewType = GraphQLNonNull(namedNewType);
        }
    }
    return namedNewType;
}
//# sourceMappingURL=copyWrappingType.js.map