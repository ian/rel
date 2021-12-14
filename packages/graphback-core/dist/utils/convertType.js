"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateObject = exports.convertType = void 0;
const bson_1 = require("bson");
/**
 * Helper function to convert a value to another type
 *
 * @param {any} value - Value to convert
 * @param {any} toType - convert value to this type
 */
function convertType(value, toType) {
    if (!value) {
        return undefined;
    }
    if (toType instanceof bson_1.ObjectID || value instanceof bson_1.ObjectID) {
        return new bson_1.ObjectID(value);
    }
    switch (typeof toType) {
        case 'string':
            return String(value);
        case 'number':
            return Number(value);
        case 'bigint':
            return BigInt(value);
        case 'boolean':
            return Boolean(value);
        case 'object':
            if (exports.isDateObject(value)) {
                return new Date(value).getTime();
            }
            return value;
        default:
            return String(value);
    }
}
exports.convertType = convertType;
/**
 * Check if value is a Date object
 *
 * @param {any} value
 */
const isDateObject = (value) => Object.prototype.toString.call(value) === '[object Date]';
exports.isDateObject = isDateObject;
//# sourceMappingURL=convertType.js.map