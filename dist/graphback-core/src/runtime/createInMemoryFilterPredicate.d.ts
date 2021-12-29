import { QueryFilter } from './QueryFilter';
/**
 * Dynamically creates a subscription filter predicate using the filter object values
 *
 * @param {QueryFilter} filter - subscription filter input object
 */
export declare function createInMemoryFilterPredicate<T = any>(filter: QueryFilter): (input: Partial<T>) => boolean;
//# sourceMappingURL=createInMemoryFilterPredicate.d.ts.map