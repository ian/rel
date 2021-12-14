"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSyncAPI = void 0;
const graphback_1 = require("graphback");
const DataSyncPlugin_1 = require("../DataSyncPlugin");
const services_1 = require("../services");
const providers_1 = require("../providers");
function createDataSyncAPI(model, createDataSyncConfig) {
    const { db, conflictConfig, graphbackAPIConfig } = createDataSyncConfig;
    return graphback_1.buildGraphbackAPI(model, Object.assign(Object.assign({}, graphbackAPIConfig), { serviceCreator: (graphbackAPIConfig === null || graphbackAPIConfig === void 0 ? void 0 : graphbackAPIConfig.serviceCreator) || services_1.createDataSyncCRUDService(), dataProviderCreator: providers_1.createDataSyncConflictProviderCreator(db, conflictConfig), plugins: [
            ...((graphbackAPIConfig === null || graphbackAPIConfig === void 0 ? void 0 : graphbackAPIConfig.plugins) || []),
            new DataSyncPlugin_1.DataSyncPlugin({ conflictConfig })
        ] }));
}
exports.createDataSyncAPI = createDataSyncAPI;
//# sourceMappingURL=createDataSync.js.map