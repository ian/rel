import { GraphQLResolveInfo } from 'graphql';
import { GraphbackCRUDService, ResultList } from './GraphbackCRUDService';
import { QueryFilter } from './QueryFilter';
import { GraphbackContext, FindByArgs } from './interfaces';
/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
export declare class GraphbackProxyService<Type = any> implements GraphbackCRUDService<Type> {
    protected proxiedService: GraphbackCRUDService;
    constructor(service: GraphbackCRUDService);
    create(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    update(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    delete(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    findOne(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>>;
    updateBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>>;
    deleteBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>>;
    subscribeToCreate(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type>;
    subscribeToUpdate(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type>;
    subscribeToDelete(filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type>;
    batchLoadData(relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo): any;
}
//# sourceMappingURL=GraphbackProxyService.d.ts.map