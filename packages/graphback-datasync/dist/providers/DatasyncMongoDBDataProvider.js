"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncMongoDBDataProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const mongodb_1 = require("mongodb");
const runtime_mongo_1 = require("@graphback/runtime-mongo");
const util_1 = require("../util");
/**
 * Mongo provider that attains data synchronization using soft deletes
 */
class DataSyncMongoDBDataProvider extends runtime_mongo_1.MongoDBDataProvider {
    constructor(model, client) {
        super(model, client);
        runtime_mongo_1.applyIndexes([
            {
                key: {
                    [util_1.DataSyncFieldNames.deleted]: 1
                }
            },
            {
                key: {
                    [util_1.DataSyncFieldNames.ttl]: 1
                },
                expireAfterSeconds: 0
            }
        ], this.db.collection(this.collectionName)).catch((e) => {
            throw e;
        });
        const DataSyncAnnotationData = util_1.getDataSyncAnnotationData(model);
        this.TTLinSeconds = parseInt(DataSyncAnnotationData.ttl, 10);
        if (isNaN(this.TTLinSeconds)) {
            // Default TTL of 2 days
            this.TTLinSeconds = 172800;
        }
    }
    create(data) {
        const _super = Object.create(null, {
            create: { get: () => super.create }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            data[util_1.DataSyncFieldNames.deleted] = false;
            data[util_1.DataSyncFieldNames.lastUpdatedAt] = Date.now();
            return _super.create.call(this, data);
        });
    }
    update(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            if (!idField.value) {
                throw new core_1.NoDataError(`Cannot update ${this.collectionName} - missing ID field`);
            }
            this.fieldTransformMap[core_1.TransformType.UPDATE]
                .forEach((f) => {
                data[f.fieldName] = f.transform(f.fieldName);
            });
            data[util_1.DataSyncFieldNames.lastUpdatedAt] = Date.now();
            const objectId = new mongodb_1.ObjectId(idField.value);
            const projection = this.buildProjectionOption(selectedFields);
            const result = yield this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [util_1.DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
            if (result === null || result === void 0 ? void 0 : result.value) {
                return result.value;
            }
            throw new core_1.NoDataError(`Cannot update ${this.collectionName}`);
        });
    }
    delete(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            data = {};
            data[util_1.DataSyncFieldNames.lastUpdatedAt] = Date.now();
            this.fieldTransformMap[core_1.TransformType.UPDATE]
                .forEach((f) => {
                data[f.fieldName] = f.transform();
            });
            data[util_1.DataSyncFieldNames.deleted] = true;
            data[util_1.DataSyncFieldNames.ttl] = new Date(Date.now() + (this.TTLinSeconds * 1000));
            const objectId = new mongodb_1.ObjectId(idField.value);
            const projection = this.buildProjectionOption(selectedFields);
            const result = yield this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId, [util_1.DataSyncFieldNames.deleted]: { $ne: true } }, { $set: data }, { returnOriginal: false, projection });
            if (result === null || result === void 0 ? void 0 : result.value) {
                return result.value;
            }
            throw new core_1.NoDataError(`Could not delete from ${this.collectionName}`);
        });
    }
    findOne(filter, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (filter.id) {
                filter = { _id: new mongodb_1.ObjectId(filter.id) };
            }
            const projection = this.buildProjectionOption(selectedFields);
            const query = this.db.collection(this.collectionName).findOne(Object.assign(Object.assign({}, filter), { [util_1.DataSyncFieldNames.deleted]: { $ne: true } }), { projection });
            const data = yield query;
            if (data) {
                const res = data;
                return res;
            }
            throw new core_1.NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
        });
    }
    findBy(args, selectedFields) {
        const _super = Object.create(null, {
            findBy: { get: () => super.findBy }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!args) {
                args = {
                    filter: {}
                };
            }
            else if (!args.filter) {
                args.filter = {};
            }
            args.filter[util_1.DataSyncFieldNames.deleted] = { ne: true };
            return _super.findBy.call(this, args, selectedFields);
        });
    }
    count(filter) {
        const _super = Object.create(null, {
            count: { get: () => super.count }
        });
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            filter = filter || {};
            filter[util_1.DataSyncFieldNames.deleted] = { ne: true };
            return _super.count.call(this, filter);
        });
    }
    sync(lastSync, selectedFields, filter, limit) {
        filter = filter || {};
        const args = {
            filter: Object.assign(Object.assign({}, filter), { [util_1.DataSyncFieldNames.lastUpdatedAt]: {
                    ge: lastSync.valueOf()
                } }),
            page: {
                limit
            }
        };
        return super.findBy(args, selectedFields);
    }
}
exports.DataSyncMongoDBDataProvider = DataSyncMongoDBDataProvider;
//# sourceMappingURL=DatasyncMongoDBDataProvider.js.map