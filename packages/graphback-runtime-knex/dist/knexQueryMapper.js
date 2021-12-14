"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKnexQueryMapper = void 0;
const knexOperators = ['=', '<>', '<=', '<', '>', '>=', 'like', 'between', 'in', 'is', 'is not'];
const knexMethods = ['where', 'orWhere', 'orWhereNot', 'whereNot'];
const mapQueryFilterOperatorToKnexWhereCondition = (operator, value) => {
    const operatorToWhereConditionMap = {
        // eslint-disable-next-line no-null/no-null
        eq: [value === null ? 'is' : '=', value],
        // eslint-disable-next-line no-null/no-null
        ne: [value === null ? 'is not' : '<>', value],
        lt: ['<', value],
        le: ['<=', value],
        ge: ['>=', value],
        gt: ['>', value],
        contains: ['like', `%${value}%`],
        startsWith: ['like', `${value}%`],
        endsWith: ['like', `%${value}`],
        in: ['in', value],
        between: ['between', value]
    };
    return operatorToWhereConditionMap[operator];
};
function buildKnexMethod(rootSelectorContext) {
    let method = 'where';
    if (rootSelectorContext === null || rootSelectorContext === void 0 ? void 0 : rootSelectorContext.not) {
        method = `${method}Not`;
    }
    if (rootSelectorContext === null || rootSelectorContext === void 0 ? void 0 : rootSelectorContext.or) {
        method = `or${method.charAt(0).toUpperCase()}${method.slice(1)}`;
    }
    return method;
}
const rootSelectorMapper = {
    and: (builder, filters, rootSelectorContext) => {
        builder = builder.where((b) => {
            filters.forEach((f) => mapQuery(b, f, Object.assign(Object.assign({}, rootSelectorContext), { and: true })));
        });
        return builder;
    },
    or: (builder, filters, rootSelectorContext) => {
        builder = builder.where((b) => {
            filters.forEach((f) => mapQuery(b, f, Object.assign(Object.assign({}, rootSelectorContext), { or: true })));
        });
        return builder;
    },
    not: (builder, filter, rootSelectorContext) => {
        const builderMethod = buildKnexMethod(rootSelectorContext);
        builder = builder[builderMethod]((b) => {
            builder = mapQuery(b, filter, Object.assign(Object.assign({}, rootSelectorContext), { not: true }));
        });
        return builder;
    },
};
/**
 * Wraps Knex methods and pipe the QueryFilter conditions into a final Knex condition
 */
const methodBuilderMapper = {
    where: (builder, filter) => {
        return builder.where((b) => b = methodBuilderMapper.finally(b, filter));
    },
    orWhere: (builder, filter) => {
        return builder.orWhere((b) => b = methodBuilderMapper.finally(b, filter));
    },
    whereNot: (builder, filter) => {
        return builder.whereNot((b) => b = methodBuilderMapper.finally(b, filter));
    },
    orWhereNot: (builder, filter) => {
        return builder.orWhereNot((b) => b = methodBuilderMapper.finally(b, filter));
    },
    finally: (builder, filter) => {
        Object.entries(filter).forEach(([col, expr]) => {
            Object.entries(expr).forEach(([operator, val]) => {
                const [mappedOperator, transformedValue] = mapQueryFilterOperatorToKnexWhereCondition(operator, val);
                builder = builder.where(col, mappedOperator, transformedValue);
            });
        });
        return builder;
    }
};
function mapQuery(builder, filter, rootSelectorContext = {}) {
    if (filter === undefined) {
        return builder;
    }
    ;
    const mappedQuery = {
        rootFieldQueries: {},
        and: [],
        or: [],
        not: {}
    };
    for (const key of Object.keys(filter)) {
        const rootSelector = rootSelectorMapper[key];
        if (rootSelector) {
            mappedQuery[key] = filter[key];
        }
        else {
            mappedQuery.rootFieldQueries[key] = filter[key];
        }
    }
    // build conditions for root fields
    if (Object.keys(mappedQuery.rootFieldQueries).length) {
        const knexMethodName = buildKnexMethod(rootSelectorContext);
        const wrappedKnexMethod = methodBuilderMapper[knexMethodName];
        if (wrappedKnexMethod) {
            builder = wrappedKnexMethod(builder, mappedQuery.rootFieldQueries);
        }
    }
    if (mappedQuery.and.length) {
        builder = rootSelectorMapper.and(builder, mappedQuery.and, rootSelectorContext);
    }
    if (mappedQuery.or.length) {
        builder = rootSelectorMapper.or(builder, mappedQuery.or, rootSelectorContext);
    }
    if (Object.keys(mappedQuery.not).length) {
        builder = rootSelectorMapper.not(builder, mappedQuery.not, rootSelectorContext);
    }
    return builder;
}
/**
 * Create an instance of a CRUD => Knex query mapper
 *  *
 * @param {Knex} knex - The current Knex connection instance
 */
function createKnexQueryMapper(knex) {
    return {
        buildQuery: (filter) => {
            return mapQuery(knex.queryBuilder(), filter);
        }
    };
}
exports.createKnexQueryMapper = createKnexQueryMapper;
//# sourceMappingURL=knexQueryMapper.js.map