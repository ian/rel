"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpecifiedGraphbackScalarType = exports.graphbackScalarsTypes = exports.JSONObject = exports.JSON_ = exports.GraphbackObjectID = exports.DateTime = exports.Date_ = exports.Timestamp = exports.Time = exports.NonPositiveInt = exports.NonPositiveFloat = exports.LocalEndTime = exports.JWT = exports.Longitude = exports.Latitude = exports.DID = exports.UtcOffset = exports.UUID = exports.USCurrency = exports.URL = exports.RGB = exports.RGBA = exports.PostalCode = exports.PositiveInt = exports.PositiveFloat = exports.Port = exports.PhoneNumber = exports.NonNegativeInt = exports.NonNegativeFloat = exports.NonEmptyString = exports.NegativeInt = exports.NegativeFloat = exports.MAC = exports.LocalTime = exports.LocalDate = exports.ISO8601Duration = exports.ISBN = exports.IPv6 = exports.IPv4 = exports.IBAN = exports.Hexadecimal = exports.HexColorCode = exports.HSL = exports.HSLA = exports.GUID = exports.EmailAddress = exports.Duration = exports.Currency = exports.Byte = exports.BigInt_ = void 0;
exports.isSpecifiedGraphbackJSONScalarType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_scalars_1 = require("graphql-scalars");
const objectId_1 = require("./objectId");
exports.BigInt_ = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.BigIntResolver)), { name: "BigInt" }));
exports.Byte = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.ByteResolver)), { name: "Byte" }));
exports.Currency = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.CurrencyResolver)), { name: "Currency" }));
exports.Duration = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DurationResolver)), { name: "Duration" }));
exports.EmailAddress = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.EmailAddressResolver)), { name: "Email" }));
exports.GUID = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.GUIDResolver)), { name: "GUID" }));
exports.HSLA = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.HSLAResolver)), { name: "HSLA" }));
exports.HSL = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.HSLResolver)), { name: "HSL" }));
exports.HexColorCode = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.HexColorCodeResolver)), { name: "HexColorCode" }));
exports.Hexadecimal = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.HexadecimalResolver)), { name: "Hexadecimal" }));
exports.IBAN = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.IBANResolver)), { name: "IBAN" }));
exports.IPv4 = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.IPv4Resolver)), { name: "IPv4" }));
exports.IPv6 = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.IPv6Resolver)), { name: "IPv6" }));
exports.ISBN = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.ISBNResolver)), { name: "ISBN" }));
exports.ISO8601Duration = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.ISO8601DurationResolver)), { name: "ISO8601Duration" }));
exports.LocalDate = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.LocalDateResolver)), { name: "LocalDate" }));
exports.LocalTime = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.LocalTimeResolver)), { name: "LocalTime" }));
exports.MAC = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.MACResolver)), { name: "MAC" }));
exports.NegativeFloat = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NegativeFloatResolver)), { name: "NegativeFloat" }));
exports.NegativeInt = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NegativeIntResolver)), { name: "NegativeInt" }));
exports.NonEmptyString = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NonEmptyStringResolver)), { name: "NonEmptyString" }));
exports.NonNegativeFloat = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NonNegativeFloatResolver)), { name: "NonNegativeFloat" }));
exports.NonNegativeInt = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NonNegativeIntResolver)), { name: "NonNegativeInt" }));
exports.PhoneNumber = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.PhoneNumberResolver)), { name: "PhoneNumber" }));
exports.Port = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.PortResolver)), { name: "Port" }));
exports.PositiveFloat = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.PositiveFloatResolver)), { name: "PositiveFloat" }));
exports.PositiveInt = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.PositiveIntResolver)), { name: "PositiveInt" }));
exports.PostalCode = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.PostalCodeResolver)), { name: "PostalCode" }));
exports.RGBA = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.RGBAResolver)), { name: "RGBA" }));
exports.RGB = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.RGBResolver)), { name: "RGB" }));
exports.URL = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.URLResolver)), { name: "URL" }));
exports.USCurrency = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.USCurrencyResolver)), { name: "USCurrency" }));
exports.UUID = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.UUIDResolver)), { name: "UUID" }));
exports.UtcOffset = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.UtcOffsetResolver)), { name: "UtcOffset" }));
exports.DID = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DIDResolver)), { name: "DID" }));
exports.Latitude = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.LatitudeResolver)), { name: "Latitude" }));
exports.Longitude = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.LongitudeResolver)), { name: "Longitude" }));
exports.JWT = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.JWTResolver)), { name: "JWT" }));
exports.LocalEndTime = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.LocalEndTimeResolver)), { name: "LocalEndTime" }));
exports.NonPositiveFloat = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NonPositiveFloatResolver)), { name: "NonPositiveFloat" }));
exports.NonPositiveInt = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.NonPositiveIntResolver)), { name: "NonPositiveInt" }));
exports.Time = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.TimeResolver)), { name: "Time" }));
exports.Timestamp = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.TimestampResolver)), { name: "Timestamp" }));
exports.Date_ = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DateResolver)), { name: "Date" }));
exports.DateTime = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.DateTimeResolver)), { name: "DateTime" }));
const _a = extractConfig(graphql_scalars_1.ObjectIDResolver), { parseLiteral, parseValue } = _a, objectIDConfig = tslib_1.__rest(_a, ["parseLiteral", "parseValue"]);
exports.GraphbackObjectID = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, objectIDConfig), { name: "GraphbackObjectID", parseValue: (value) => objectId_1.parseObjectID(parseValue(value)), parseLiteral: (ast, variables) => objectId_1.parseObjectID(parseLiteral(ast, variables)) }));
exports.JSON_ = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.JSONResolver)), { name: "JSON" }));
exports.JSONObject = new graphql_1.GraphQLScalarType(Object.assign(Object.assign({}, extractConfig(graphql_scalars_1.JSONObjectResolver)), { name: "JSONObject" }));
exports.graphbackScalarsTypes = [exports.BigInt_, exports.Byte, exports.Currency, exports.DID, exports.Duration, exports.EmailAddress,
    exports.GUID, exports.HSL, exports.HSLA, exports.HexColorCode, exports.Hexadecimal, exports.IBAN, exports.IPv4, exports.IPv6, exports.ISBN, exports.ISO8601Duration,
    exports.JWT, exports.Latitude, exports.LocalDate, exports.LocalEndTime, exports.LocalTime, exports.Longitude, exports.MAC, exports.NegativeFloat,
    exports.NegativeInt, exports.NonEmptyString, exports.NonNegativeFloat, exports.NonNegativeInt, exports.NonPositiveFloat,
    exports.NonPositiveInt, exports.PhoneNumber, exports.Port, exports.PositiveFloat, exports.PositiveInt, exports.PostalCode,
    exports.RGB, exports.RGBA, exports.URL, exports.USCurrency, exports.UUID, exports.UtcOffset,
    exports.Time, exports.Date_, exports.JSON_, exports.GraphbackObjectID, exports.DateTime, exports.Timestamp, exports.JSONObject];
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
    return name === exports.JSONObject.name || name === exports.JSON_.name;
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