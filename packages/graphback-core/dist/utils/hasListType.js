"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasListType = void 0;
const graphql_1 = require("graphql");
function hasListType(outputType) {
    if (graphql_1.isListType(outputType)) {
        return true;
    }
    else if (graphql_1.isWrappingType(outputType)) {
        return hasListType(outputType.ofType);
    }
    return false;
}
exports.hasListType = hasListType;
//# sourceMappingURL=hasListType.js.map