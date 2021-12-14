"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRuntime = exports.createMongoDBClient = exports.ConflictStrategyMap = void 0;
const tslib_1 = require("tslib");
const graphback_1 = require("graphback");
const runtime_mongo_1 = require("@graphback/runtime-mongo");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongodb_1 = require("mongodb");
const loadModel_1 = require("./loadModel");
const datasync_1 = require("@graphback/datasync");
exports.ConflictStrategyMap = {
    clientSideWins: datasync_1.ClientSideWins,
    serverSideWins: datasync_1.ServerSideWins,
    throwOnConflict: datasync_1.ThrowOnConflict
};
;
const createMongoDBClient = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const server = new mongodb_memory_server_1.MongoMemoryServer();
    const client = new mongodb_1.MongoClient(yield server.getUri(), { useUnifiedTopology: true });
    yield client.connect();
    return client;
});
exports.createMongoDBClient = createMongoDBClient;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Method used to create runtime schema
 * It will be part of the integration tests
 */
function createRuntime(modelDir, db, datasyncServeConfig) {
    const model = loadModel_1.loadModel(modelDir);
    if (datasyncServeConfig.datasync) {
        let conflictResolutionStrategy = datasync_1.ClientSideWins;
        let deltaTTL = 172800;
        if (datasyncServeConfig.conflict) {
            conflictResolutionStrategy = exports.ConflictStrategyMap[datasyncServeConfig.conflict];
        }
        if (datasyncServeConfig.deltaTTL !== undefined && datasyncServeConfig.deltaTTL !== null) {
            deltaTTL = datasyncServeConfig.deltaTTL;
        }
        return datasync_1.createDataSyncAPI(model, {
            db,
            conflictConfig: {
                enabled: true,
                conflictResolution: conflictResolutionStrategy,
                deltaTTL
            }
        });
    }
    return graphback_1.buildGraphbackAPI(model, { dataProviderCreator: runtime_mongo_1.createMongoDbProvider(db) });
}
exports.createRuntime = createRuntime;
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-return */
//# sourceMappingURL=runtime.js.map