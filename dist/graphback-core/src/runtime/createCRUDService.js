import { PubSub } from 'graphql-subscriptions';
import { CRUDService } from './CRUDService';
export function createCRUDService(config) {
    return (model, dataProvider) => {
        const serviceConfig = {
            pubSub: new PubSub(),
            ...config,
            crudOptions: model.crudOptions
        };
        return new CRUDService(model, dataProvider, serviceConfig);
    };
}
//# sourceMappingURL=createCRUDService.js.map