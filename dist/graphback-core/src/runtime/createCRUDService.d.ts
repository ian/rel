import { PubSubEngine } from 'graphql-subscriptions';
import { ServiceCreator } from '.';
export interface CreateCRUDServiceOptions {
    /**
     * PubSub implementation for creating subscriptions
     */
    pubSub?: PubSubEngine;
}
export declare function createCRUDService(config?: CreateCRUDServiceOptions): ServiceCreator;
//# sourceMappingURL=createCRUDService.d.ts.map