"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformForeignKeyName = exports.defaultTableNameTransform = void 0;
/**
 * Transform to/from database table name
 *
 * @param name - model name
 * @param direction - transform to or from database
 */
function defaultTableNameTransform(name, direction) {
    if (direction === 'to-db') {
        return name.toLowerCase();
    }
    return name;
}
exports.defaultTableNameTransform = defaultTableNameTransform;
function transformForeignKeyName(name, direction = 'to-db') {
    if (direction === 'to-db') {
        return `${name}Id`;
    }
    return name;
}
exports.transformForeignKeyName = transformForeignKeyName;
//# sourceMappingURL=defaultNameTransforms.js.map