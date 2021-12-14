"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncConflictMongoDBDataProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const util_1 = require("../util");
const deltaSource_1 = require("../deltaSource");
const getMaxRetries_1 = require("../helpers/getMaxRetries");
const DatasyncMongoDBDataProvider_1 = require("./DatasyncMongoDBDataProvider");
/**
 * Data Provider with update conflicts and optional conflict resolution
 * that connects to the MongoDB database
 */
class DataSyncConflictMongoDBDataProvider extends DatasyncMongoDBDataProvider_1.DataSyncMongoDBDataProvider {
    constructor(model, client, dataSyncConflictConfig) {
        super(model, client);
        this.conflictConfig = dataSyncConflictConfig;
        this.MAX_RETRIES = getMaxRetries_1.getMaxRetries();
        if (!this.conflictConfig.conflictResolution) {
            this.conflictConfig.conflictResolution = util_1.ClientSideWins;
        }
        this.deltaSource = new deltaSource_1.MongoDeltaSource(model, client, this.conflictConfig.deltaTTL);
    }
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            data[util_1.DataSyncFieldNames.version] = 1;
            const result = yield _super.create.call(this, data);
            yield this.deltaSource.insertDiff(result).catch((e) => {
                // eslint-disable-next-line no-console
                console.error(`Error in inserting delta: ${e}`);
            });
            return result;
        });
    }
    update(updateDocument, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _id } = updateDocument;
            for (let i = 0; i < this.MAX_RETRIES; i++) {
                const serverData = yield this.db.collection(this.collectionName).findOne({ _id });
                if (!serverData) {
                    throw new core_1.NoDataError(`Cannot update ${this.collectionName}`);
                }
                const base = yield this.deltaSource.findBaseForConflicts(updateDocument);
                let resolvedUpdate = Object.assign({}, updateDocument);
                const updateFilter = { _id, [util_1.DataSyncFieldNames.version]: serverData[util_1.DataSyncFieldNames.version] };
                if (serverData[util_1.DataSyncFieldNames.version] !== updateDocument[util_1.DataSyncFieldNames.version]) {
                    const conflict = this.checkForConflict(updateDocument, base, serverData, core_1.GraphbackOperationType.UPDATE);
                    if (conflict) {
                        resolvedUpdate = this.conflictConfig.conflictResolution.resolveUpdate(conflict);
                    }
                }
                if (Object.keys(resolvedUpdate).length === 0) {
                    return serverData;
                }
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                resolvedUpdate[util_1.DataSyncFieldNames.version] = serverData[util_1.DataSyncFieldNames.version] + 1;
                resolvedUpdate[util_1.DataSyncFieldNames.lastUpdatedAt] = Date.now();
                const projection = this.buildProjectionOption(selectedFields);
                const { value } = yield this.db.collection(this.collectionName).findOneAndUpdate(updateFilter, { $set: resolvedUpdate }, { projection, returnOriginal: false });
                if (value) {
                    yield this.deltaSource.insertDiff(value);
                    return value;
                }
            }
            throw new Error(`Cannot update ${this.collectionName}`);
        });
    }
    delete(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _id } = data;
            for (let i = 0; i < this.MAX_RETRIES; i++) {
                const serverData = yield this.db.collection(this.collectionName).findOne({ _id });
                if (!serverData) {
                    throw new core_1.NoDataError(`Cannot update ${this.collectionName}`);
                }
                const base = yield this.deltaSource.findBaseForConflicts(data);
                let resolvedData = Object.assign(data, base, { [util_1.DataSyncFieldNames.deleted]: true });
                const updateFilter = { _id, [util_1.DataSyncFieldNames.version]: serverData[util_1.DataSyncFieldNames.version] };
                if (serverData[util_1.DataSyncFieldNames.version] !== data[util_1.DataSyncFieldNames.version]) {
                    const conflict = this.checkForConflict(data, base, serverData, core_1.GraphbackOperationType.DELETE);
                    if (conflict) {
                        resolvedData = this.conflictConfig.conflictResolution.resolveDelete(conflict);
                    }
                }
                if (Object.keys(resolvedData).length === 0) {
                    return serverData;
                }
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                resolvedData[util_1.DataSyncFieldNames.version] = serverData[util_1.DataSyncFieldNames.version] + 1;
                resolvedData[util_1.DataSyncFieldNames.lastUpdatedAt] = Date.now();
                resolvedData[util_1.DataSyncFieldNames.ttl] = new Date(Date.now() + (this.TTLinSeconds * 1000));
                const projection = this.buildProjectionOption(selectedFields);
                const { value } = yield this.db.collection(this.collectionName).findOneAndUpdate(updateFilter, { $set: resolvedData }, { projection, returnOriginal: false });
                if (value) {
                    yield this.deltaSource.insertDiff(value);
                    return value;
                }
            }
            throw new Error(`Cannot update ${this.collectionName}`);
        });
    }
    checkForConflict(clientData, base, serverData, operation) {
        const ignoredKeys = ["_id", util_1.DataSyncFieldNames.lastUpdatedAt, util_1.DataSyncFieldNames.version];
        const clientDiff = {};
        const serverDiff = {};
        const metadata = {
            base,
            serverData,
            clientData,
            serverDiff,
            clientDiff,
            operation
        };
        if (!base) {
            throw new util_1.ConflictError(metadata);
        }
        let conflictFound = false;
        // Calculate clientDiff and serverDiff
        for (const key of Object.keys(clientData)) {
            if (!ignoredKeys.includes(key)) {
                //                                    If client sends a delete mutation, insert all fields into diff
                if (base[key] !== clientData[key] || clientData[util_1.DataSyncFieldNames.deleted] === true) {
                    clientDiff[key] = clientData[key];
                }
                //                                    If server side document is deleted, insert all fields into diff
                if (base[key] !== serverData[key] || serverData[util_1.DataSyncFieldNames.deleted] === true) {
                    serverDiff[key] = serverData[key];
                    if (clientDiff[key]) {
                        conflictFound = true;
                    }
                }
            }
        }
        if (conflictFound) {
            return metadata;
        }
        return undefined;
    }
}
exports.DataSyncConflictMongoDBDataProvider = DataSyncConflictMongoDBDataProvider;
//# sourceMappingURL=DataSyncConflictProvider.js.map