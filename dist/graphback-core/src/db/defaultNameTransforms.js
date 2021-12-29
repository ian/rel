/**
 * Transform to/from database table name
 *
 * @param name - model name
 * @param direction - transform to or from database
 */
export function defaultTableNameTransform(name, direction) {
    if (direction === 'to-db') {
        return name.toLowerCase();
    }
    return name;
}
export function transformForeignKeyName(name, direction = 'to-db') {
    if (direction === 'to-db') {
        return `${name}Id`;
    }
    return name;
}
//# sourceMappingURL=defaultNameTransforms.js.map