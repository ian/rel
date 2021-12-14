"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCRUDService = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const CRUDService_1 = require("./CRUDService");
function createCRUDService(config) {
    return (model, dataProvider) => {
        const serviceConfig = Object.assign(Object.assign({ pubSub: new graphql_subscriptions_1.PubSub() }, config), { crudOptions: model.crudOptions });
        return new CRUDService_1.CRUDService(model, dataProvider, serviceConfig);
    };
}
exports.createCRUDService = createCRUDService;
//# sourceMappingURL=createCRUDService.js.map