"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
const escapeRegex = require("escape-string-regexp");
const operators = ['$exists', '$le', '$ge', '$gte', '$regex', '$ne', '$eq', '$lte', '$lt', '$gt', '$in'];
const operatorMap = {
    and: '$and',
    or: '$or',
    ne: '$ne',
    eq: '$eq',
    le: '$lte',
    lt: '$lt',
    ge: '$gte',
    gt: '$gt',
    in: '$in'
};
// A map of functions to transform mongodb incompatible operators
// Each function returns pairs of a key and an object for that key
const operatorTransform = {
    not: (value) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
            value = [value];
        }
        return [
            ['$nor', value]
        ];
    },
    between: (values) => {
        values.sort();
        return [
            [operatorMap.ge, values[0]],
            [operatorMap.le, values[1]]
        ];
    },
    nbetween: (values) => {
        values.sort();
        return [
            [
                "$not",
                {
                    [operatorMap.ge]: values[0],
                    [operatorMap.le]: values[1],
                }
            ],
            [
                "$exists",
                true
            ]
        ];
    },
    contains: (value) => {
        return [
            ['$regex', new RegExp(escapeRegex(value), 'g')]
        ];
    },
    startsWith: (value) => {
        return [
            ['$regex', new RegExp(`^${escapeRegex(value)}`, 'g')]
        ];
    },
    endsWith: (value) => {
        return [
            ['$regex', new RegExp(`${escapeRegex(value)}$`, 'g')]
        ];
    },
};
function isPrimitive(test) {
    return ((test instanceof RegExp) || (test !== Object(test)));
}
;
function isQueryOperator(key) {
    return operators.includes(key);
}
/**
 * Map Graphback Filter to MongoDb QueryFilter
 *
 * @param {any} filter
 */
function mapQueryFilterToMongoFilterQuery(filter) {
    if (filter === undefined) {
        return undefined;
    }
    ;
    if (Array.isArray(filter)) {
        return filter.map(mapQueryFilterToMongoFilterQuery);
    }
    else if (!isPrimitive(filter)) {
        return Object.keys(filter).reduce((obj, key) => {
            const propKey = operatorMap[key] || key;
            let propVal;
            if (isQueryOperator(propKey)) {
                propVal = filter[key];
            }
            else {
                propVal = mapQueryFilterToMongoFilterQuery(filter[key]);
            }
            if (operatorTransform[propKey]) {
                const transforms = operatorTransform[key](propVal);
                transforms.forEach((t) => {
                    const [operator, value] = t;
                    propVal = value;
                    obj[operator] = propVal;
                });
            }
            else {
                obj[propKey] = propVal;
            }
            return obj;
        }, {});
    }
    return filter;
}
/**
 * Build a MongoDB query from a Graphback filter
 *
 * @param {QueryFilter} filter
 */
function buildQuery(filter) {
    return mapQueryFilterToMongoFilterQuery(filter);
}
exports.buildQuery = buildQuery;
//# sourceMappingURL=queryBuilder.js.map