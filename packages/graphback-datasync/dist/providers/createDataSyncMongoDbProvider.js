"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataSyncConflictProviderCreator = exports.createDataSyncMongoDbProvider = void 0;
const runtime_mongo_1 = require("@graphback/runtime-mongo");
const util_1 = require("../util");
const DatasyncMongoDBDataProvider_1 = require("./DatasyncMongoDBDataProvider");
const DataSyncConflictProvider_1 = require("./DataSyncConflictProvider");
/**
 * Creates a new Data synchronisation data provider for MongoDb
 *
 * @param {Db} db - MongoDb connection
 */
function createDataSyncMongoDbProvider(db) {
    return (model) => {
        if (util_1.isDataSyncModel(model)) {
            return new DatasyncMongoDBDataProvider_1.DataSyncMongoDBDataProvider(model, db);
        }
        else {
            return new runtime_mongo_1.MongoDBDataProvider(model, db);
        }
    };
}
exports.createDataSyncMongoDbProvider = createDataSyncMongoDbProvider;
/**
 * Creates a new Data Synchronization data provider creator for MongoDB with
 * optionally specified per-model conflict configuration
 *
 * @param {Db} db - MongoDB Db object
 * @param {DataSyncModelConfigMap} conflictConfig - Object for configuring conflicts for individual models
 */
function createDataSyncConflictProviderCreator(db, conflictConfig) {
    return (model) => {
        if (util_1.isDataSyncModel(model)) {
            const dataSyncModelConfig = util_1.getModelConfigFromGlobal(model.graphqlType.name, conflictConfig);
            if (dataSyncModelConfig.enabled) {
                return new DataSyncConflictProvider_1.DataSyncConflictMongoDBDataProvider(model, db, dataSyncModelConfig);
            }
            return new DatasyncMongoDBDataProvider_1.DataSyncMongoDBDataProvider(model, db);
        }
        else {
            return new runtime_mongo_1.MongoDBDataProvider(model, db);
        }
    };
}
exports.createDataSyncConflictProviderCreator = createDataSyncConflictProviderCreator;
//# sourceMappingURL=createDataSyncMongoDbProvider.js.map