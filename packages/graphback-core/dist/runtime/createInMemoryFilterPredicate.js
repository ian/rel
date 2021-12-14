"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInMemoryFilterPredicate = void 0;
const convertType_1 = require("../utils/convertType");
const objectId_1 = require("../scalars/objectId");
const predicateMap = {
    eq: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        return (parsedFieldValue === null || parsedFieldValue === void 0 ? void 0 : parsedFieldValue.toString()) === (parsedFilterValue === null || parsedFilterValue === void 0 ? void 0 : parsedFilterValue.toString());
    },
    ne: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        return (parsedFilterValue === null || parsedFilterValue === void 0 ? void 0 : parsedFilterValue.toString()) !== (parsedFieldValue === null || parsedFieldValue === void 0 ? void 0 : parsedFieldValue.toString());
    },
    gt: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        return parsedFieldValue > parsedFilterValue;
    },
    ge: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (objectId_1.isObjectID(parsedFieldValue) && objectId_1.isObjectID(parsedFilterValue)) {
            return objectId_1.getObjectIDTimestamp(parsedFieldValue) >= objectId_1.getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue >= parsedFilterValue;
    },
    le: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (objectId_1.isObjectID(parsedFieldValue) && objectId_1.isObjectID(parsedFilterValue)) {
            return objectId_1.getObjectIDTimestamp(parsedFieldValue) <= objectId_1.getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue <= parsedFilterValue;
    },
    lt: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType_1.convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType_1.convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (objectId_1.isObjectID(parsedFieldValue) && objectId_1.isObjectID(parsedFilterValue)) {
            return objectId_1.getObjectIDTimestamp(parsedFieldValue) < objectId_1.getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue < parsedFilterValue;
    },
    in: (filterValue) => (fieldValue) => {
        return filterValue.map((f) => f === null || f === void 0 ? void 0 : f.toString()).includes(fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.toString());
    },
    between: ([fromVal, toVal]) => (fieldValue) => {
        if (convertType_1.isDateObject(fieldValue)) {
            const fieldValDate = convertType_1.convertType(fieldValue, fieldValue);
            const fromValDate = convertType_1.convertType(fromVal, fieldValue);
            const toValDate = convertType_1.convertType(toVal, fieldValue);
            return fieldValDate >= fromValDate && fieldValDate <= toValDate;
        }
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (objectId_1.isObjectID(fromVal) || objectId_1.isObjectID(toVal) || objectId_1.isObjectID(fieldValue)) {
            const toValTimestamp = objectId_1.getObjectIDTimestamp(objectId_1.parseObjectID(toVal.toString()));
            const fromValTimestamp = objectId_1.getObjectIDTimestamp(objectId_1.parseObjectID(fromVal.toString()));
            const fieldValTimestamp = objectId_1.getObjectIDTimestamp(objectId_1.parseObjectID(fieldValue.toString()));
            return fieldValTimestamp >= fromValTimestamp && fieldValTimestamp <= toValTimestamp;
        }
        const parsedFieldValue = Number(fieldValue);
        return parsedFieldValue >= Number(fromVal) && parsedFieldValue <= Number(toVal);
    },
    contains: (filterValue = '') => (fieldValue = '') => {
        return fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.toString().includes(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString());
    },
    startsWith: (filterValue = '') => (fieldValue = '') => {
        return fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.toString().startsWith(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString());
    },
    endsWith: (filterValue = '') => (fieldValue = '') => {
        return fieldValue === null || fieldValue === void 0 ? void 0 : fieldValue.toString().endsWith(filterValue === null || filterValue === void 0 ? void 0 : filterValue.toString());
    }
};
/**
 * Dynamically creates a subscription filter predicate using the filter object values
 *
 * @param {QueryFilter} filter - subscription filter input object
 */
function createInMemoryFilterPredicate(filter) {
    filter = filter || {};
    const andFilter = filter.and;
    const orFilter = filter.or;
    const notFilter = filter.not;
    const filterFields = Object.keys(filter).filter((key) => !['and', 'or', 'not'].includes(key));
    return (payload) => {
        let predicateResult = true;
        for (const fieldName of filterFields) {
            // skip these filter expressions
            if (['and', 'or', 'not'].includes(fieldName)) {
                continue;
            }
            const fieldFilter = filter[fieldName];
            for (const [expr, exprVal] of Object.entries(fieldFilter)) {
                const predicateFn = predicateMap[expr](exprVal);
                if (!predicateFn(payload[fieldName])) {
                    predicateResult = false;
                    break;
                }
            }
        }
        if (orFilter) {
            const orPredicateResult = getOrPredicateResult(orFilter, payload);
            predicateResult = predicateResult && orPredicateResult;
            if (!predicateResult) {
                return false;
            }
        }
        if (andFilter) {
            const andPredicateResult = getAndPredicateResult(andFilter, payload);
            predicateResult = predicateResult && andPredicateResult;
        }
        if (notFilter) {
            const notPredicateResult = createInMemoryFilterPredicate(notFilter)(payload);
            predicateResult = predicateResult && !notPredicateResult;
        }
        return predicateResult;
    };
}
exports.createInMemoryFilterPredicate = createInMemoryFilterPredicate;
/**
 * Get the predicate result of an `and` filter expression
 *
 * @param {QueryFilter[]} and - And filter
 * @param {Partial<T>} payload - Subscription payload
 */
function getAndPredicateResult(and, payload) {
    let andResult = true;
    for (const andItem of and) {
        andResult = createInMemoryFilterPredicate(andItem)(payload);
        if (!andResult) {
            break;
        }
    }
    return andResult;
}
/**
 * Get the boolean result of an `or` filter expression
 *
 * @param {QueryFilter[]} or - Or query filter
 * @param {Partial<T>} payload - Subscription payload
 */
function getOrPredicateResult(or, payload) {
    let orResult = true;
    for (const orItem of or) {
        orResult = createInMemoryFilterPredicate(orItem)(payload);
        if (orResult) {
            break;
        }
    }
    return orResult;
}
//# sourceMappingURL=createInMemoryFilterPredicate.js.map