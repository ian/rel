"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSyncCRUDService = void 0;
const core_1 = require("@graphback/core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const util_1 = require("../util");
const DataSyncCRUDService_1 = require("./DataSyncCRUDService");
/**
 *
 * @param config
 */
function createDataSyncCRUDService(config) {
    return (model, dataProvider) => {
        const serviceConfig = Object.assign(Object.assign({ pubSub: new graphql_subscriptions_1.PubSub() }, config), { crudOptions: model.crudOptions });
        if (util_1.isDataSyncModel(model)) {
            return new DataSyncCRUDService_1.DataSyncCRUDService(model, dataProvider, serviceConfig);
        }
        else {
            return new core_1.CRUDService(model, dataProvider, serviceConfig);
        }
    };
}
exports.createDataSyncCRUDService = createDataSyncCRUDService;
//# sourceMappingURL=createDataSyncService.js.map