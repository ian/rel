"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeltaSource = exports.getDeltaTableName = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const runtime_mongo_1 = require("@graphback/runtime-mongo");
const util_1 = require("./util");
function getDeltaTableName(tableName) {
    return `${tableName}Delta`;
}
exports.getDeltaTableName = getDeltaTableName;
/**
 * Provides the ability to insert delta snapshots into MongoDB collections
 * and get base for conflict resolution
 */
class MongoDeltaSource {
    constructor(model, db, deltaTTL) {
        this.db = db;
        this.collectionName = getDeltaTableName(core_1.getTableName(model.graphqlType));
        this.deltaTTL = deltaTTL;
        runtime_mongo_1.applyIndexes([
            {
                key: {
                    [util_1.DataSyncFieldNames.ttl]: 1
                },
                expireAfterSeconds: 0
            }
        ], this.db.collection(this.collectionName)).catch((e) => {
            // eslint-disable-next-line no-console
            console.error(`Could not create TTL Index for delta table: ${this.collectionName}: ${e}`);
        });
    }
    insertDiff(updatedDocument) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { _id, [util_1.DataSyncFieldNames.version]: version } = updatedDocument;
            const diff = {
                docId: _id,
                [util_1.DataSyncFieldNames.version]: version,
                document: updatedDocument,
                [util_1.DataSyncFieldNames.ttl]: new Date(Date.now() + (this.deltaTTL * 1000))
            };
            yield this.db.collection(this.collectionName).insertOne(diff);
        });
    }
    findBaseForConflicts(updateDocument) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!updateDocument._id || !updateDocument[util_1.DataSyncFieldNames.version]) {
                throw new Error(`Both _id and ${util_1.DataSyncFieldNames.version} field are needed for finding base`);
            }
            const filter = {
                docId: updateDocument._id,
                [util_1.DataSyncFieldNames.version]: updateDocument[util_1.DataSyncFieldNames.version]
            };
            const result = yield this.db.collection(this.collectionName).findOne(filter);
            return result === null || result === void 0 ? void 0 : result.document;
        });
    }
}
exports.MongoDeltaSource = MongoDeltaSource;
//# sourceMappingURL=deltaSource.js.map