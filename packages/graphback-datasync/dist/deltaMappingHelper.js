"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeltaQuery = exports.getDeltaType = exports.getDeltaListType = void 0;
const pluralize = require("pluralize");
function getDeltaListType(typeName) {
    return `${typeName}DeltaList`;
}
exports.getDeltaListType = getDeltaListType;
function getDeltaType(typeName) {
    return `${typeName}Delta`;
}
exports.getDeltaType = getDeltaType;
/**
 * Get the name of delta query for a model
 * @param typeName Name of the model
 */
function getDeltaQuery(typeName) {
    return `sync${pluralize(typeName)}`;
}
exports.getDeltaQuery = getDeltaQuery;
//# sourceMappingURL=deltaMappingHelper.js.map