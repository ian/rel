import { PubSubEngine } from 'graphql-subscriptions';
import { GraphQLResolveInfo } from 'graphql';
import { GraphbackCRUDGeneratorConfig, GraphbackOperationType } from '..';
import { ModelDefinition } from '../plugin/ModelDefinition';
import { FindByArgs } from './interfaces';
import { QueryFilter } from './QueryFilter';
import { GraphbackCRUDService, GraphbackDataProvider, GraphbackContext, ResultList } from '.';
/**
 * Configurations necessary to create a CRUDService
 */
export interface CRUDServiceConfig {
    /**
     * PubSub implementation for creating subscriptions
     */
    pubSub?: PubSubEngine;
    /**
     * Model-specific CRUD configuration
     */
    crudOptions: GraphbackCRUDGeneratorConfig;
}
/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
export declare class CRUDService<Type = any> implements GraphbackCRUDService<Type> {
    protected db: GraphbackDataProvider;
    protected model: ModelDefinition;
    protected pubSub: PubSubEngine;
    protected crudOptions: GraphbackCRUDGeneratorConfig;
    constructor(model: ModelDefinition, db: GraphbackDataProvider, config: CRUDServiceConfig);
    create(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    update(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    updateBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>>;
    delete(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    deleteBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>>;
    findOne(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type>;
    findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>>;
    subscribeToCreate(filter?: QueryFilter): AsyncIterator<Type> | undefined;
    subscribeToUpdate(filter?: QueryFilter): AsyncIterator<Type> | undefined;
    subscribeToDelete(filter?: QueryFilter): AsyncIterator<Type> | undefined;
    batchLoadData(relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo): any;
    /**
     * Provides way to map runtime topics for subscriptions for specific types and object names
     */
    protected subscriptionTopicMapping(triggerType: GraphbackOperationType, objectName: string): string;
    private buildEventPayload;
}
//# sourceMappingURL=CRUDService.d.ts.map