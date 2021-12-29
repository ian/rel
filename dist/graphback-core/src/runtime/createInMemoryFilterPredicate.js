import { convertType, isDateObject } from '../utils/convertType';
import { parseObjectID, isObjectID, getObjectIDTimestamp } from '../scalars/objectId';
const predicateMap = {
    eq: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        return parsedFieldValue?.toString() === parsedFilterValue?.toString();
    },
    ne: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        return parsedFilterValue?.toString() !== parsedFieldValue?.toString();
    },
    gt: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        return parsedFieldValue > parsedFilterValue;
    },
    ge: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
            return getObjectIDTimestamp(parsedFieldValue) >= getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue >= parsedFilterValue;
    },
    le: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
            return getObjectIDTimestamp(parsedFieldValue) <= getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue <= parsedFilterValue;
    },
    lt: (filterValue) => (fieldValue) => {
        const parsedFieldValue = convertType(fieldValue, filterValue);
        const parsedFilterValue = convertType(filterValue, parsedFieldValue);
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (isObjectID(parsedFieldValue) && isObjectID(parsedFilterValue)) {
            return getObjectIDTimestamp(parsedFieldValue) < getObjectIDTimestamp(parsedFilterValue);
        }
        return parsedFieldValue < parsedFilterValue;
    },
    in: (filterValue) => (fieldValue) => {
        return filterValue.map((f) => f?.toString()).includes(fieldValue?.toString());
    },
    between: ([fromVal, toVal]) => (fieldValue) => {
        if (isDateObject(fieldValue)) {
            const fieldValDate = convertType(fieldValue, fieldValue);
            const fromValDate = convertType(fromVal, fieldValue);
            const toValDate = convertType(toVal, fieldValue);
            return fieldValDate >= fromValDate && fieldValDate <= toValDate;
        }
        // if values are of MongoDb ObjectID, convert to timestamp before comparison
        if (isObjectID(fromVal) || isObjectID(toVal) || isObjectID(fieldValue)) {
            const toValTimestamp = getObjectIDTimestamp(parseObjectID(toVal.toString()));
            const fromValTimestamp = getObjectIDTimestamp(parseObjectID(fromVal.toString()));
            const fieldValTimestamp = getObjectIDTimestamp(parseObjectID(fieldValue.toString()));
            return fieldValTimestamp >= fromValTimestamp && fieldValTimestamp <= toValTimestamp;
        }
        const parsedFieldValue = Number(fieldValue);
        return parsedFieldValue >= Number(fromVal) && parsedFieldValue <= Number(toVal);
    },
    contains: (filterValue = '') => (fieldValue = '') => {
        return fieldValue?.toString().includes(filterValue?.toString());
    },
    startsWith: (filterValue = '') => (fieldValue = '') => {
        return fieldValue?.toString().startsWith(filterValue?.toString());
    },
    endsWith: (filterValue = '') => (fieldValue = '') => {
        return fieldValue?.toString().endsWith(filterValue?.toString());
    }
};
/**
 * Dynamically creates a subscription filter predicate using the filter object values
 *
 * @param {QueryFilter} filter - subscription filter input object
 */
export function createInMemoryFilterPredicate(filter) {
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
        if (orFilter != null) {
            const orPredicateResult = getOrPredicateResult(orFilter, payload);
            predicateResult = predicateResult && orPredicateResult;
            if (!predicateResult) {
                return false;
            }
        }
        if (andFilter != null) {
            const andPredicateResult = getAndPredicateResult(andFilter, payload);
            predicateResult = predicateResult && andPredicateResult;
        }
        if (notFilter != null) {
            const notPredicateResult = createInMemoryFilterPredicate(notFilter)(payload);
            predicateResult = predicateResult && !notPredicateResult;
        }
        return predicateResult;
    };
}
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