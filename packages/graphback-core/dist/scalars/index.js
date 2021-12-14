"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpecifiedGraphbackJSONScalarType = exports.isSpecifiedGraphbackScalarType = exports.graphbackScalarsTypes = exports.GraphbackJSONObject = exports.GraphbackJSON = exports.GraphbackObjectID = exports.GraphbackDateTime = exports.GraphbackDate = exports.GraphbackTimestamp = exports.GraphbackTime = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const objectId_1 = require("./objectId");
exports.GraphbackTime = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.TimeResolver)), { name: "GraphbackTime" }));
exports.GraphbackTimestamp = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.TimestampResolver)), { name: "GraphbackTimestamp" }));
exports.GraphbackDate = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DateResolver)), { name: "GraphbackDate" }));
exports.GraphbackDateTime = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DateTimeResolver)), { name: "GraphbackDateTime" }));
const _a = extractConfig(graphql_scalars_1.ObjectIDResolver), { parseLiteral, parseValue } = _a, objectIDConfig = tslib_1.__rest(_a, ["parseLiteral", "parseValue"]);
exports.GraphbackObjectID = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, objectIDConfig), { name: "GraphbackObjectID", parseValue: (value) => objectId_1.parseObjectID(parseValue(value)), parseLiteral: (ast, variables) => objectId_1.parseObjectID(parseLiteral(ast, variables)) }));
exports.GraphbackJSON = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.JSONResolver)), { name: "GraphbackJSON" }));
exports.GraphbackJSONObject = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.JSONObjectResolver)), { name: "GraphbackJSONObject" }));
exports.graphbackScalarsTypes = [exports.GraphbackTime, exports.GraphbackDate, exports.GraphbackJSON, exports.GraphbackObjectID, exports.GraphbackDateTime, exports.GraphbackTimestamp, exports.GraphbackJSONObject];
/**
 * Checks if the type is on the default Graphback supported scalars
 *
 * @param type - GraphQL type
 */
function isSpecifiedGraphbackScalarType(type) {
    return exports.graphbackScalarsTypes.some(({ name }) => type.name === name);
}
exports.isSpecifiedGraphbackScalarType = isSpecifiedGraphbackScalarType;
/**
 * Checks if the type is on the known JSON Graphback supported scalars
 *
 * @param type - GraphQL type
 */
function isSpecifiedGraphbackJSONScalarType(type) {
    const name = type.name;
    return name === exports.GraphbackJSONObject.name || name === exports.GraphbackJSON.name;
}
exports.isSpecifiedGraphbackJSONScalarType = isSpecifiedGraphbackJSONScalarType;
/**
 * Extract config from wrapped scalar type
 * @param scalar
 */
function extractConfig(wrappedScalar) {
    const _a = wrappedScalar.toConfig(), { name } = _a, config = tslib_1.__rest(_a, ["name"]);
    return config;
}
//# sourceMappingURL=index.js.map