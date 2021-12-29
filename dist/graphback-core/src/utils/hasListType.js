import { isWrappingType, isListType } from 'graphql';
export function hasListType(outputType) {
    if (isListType(outputType)) {
        return true;
    }
    else if (isWrappingType(outputType)) {
        return hasListType(outputType.ofType);
    }
    return false;
}
//# sourceMappingURL=hasListType.js.map