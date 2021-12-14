"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDataProvider = void 0;
const tslib_1 = require("tslib");
const mongodb_1 = require("mongodb");
const core_1 = require("@graphback/core");
const queryBuilder_1 = require("./queryBuilder");
const createIndexes_1 = require("./utils/createIndexes");
/**
 * Graphback provider that connnects to the MongoDB database
 */
class MongoDBDataProvider {
    constructor(model, db) {
        this.verifyMongoDBPrimaryKey(model.graphqlType.name, model.primaryKey);
        this.db = db;
        this.tableMap = core_1.buildModelTableMap(model.graphqlType);
        this.collectionName = this.tableMap.tableName;
        this.fieldTransformMap = core_1.getFieldTransformations(model.graphqlType);
        createIndexes_1.findAndCreateIndexes(model.graphqlType, this.db.collection(this.collectionName)).catch((e) => {
            throw e;
        });
    }
    create(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            if (data && data[idField.name]) {
                // Ignore id passed from client side. In case id is passed it should not be saved
                // eslint-disable-next-line @typescript-eslint/tslint/config
                delete data[idField.name];
            }
            this.fieldTransformMap[core_1.TransformType.CREATE]
                .forEach((f) => {
                data[f.fieldName] = f.transform(f.fieldName);
            });
            const result = yield this.db.collection(this.collectionName).insertOne(data);
            if (result && result.ops) {
                return result.ops[0];
            }
            throw new core_1.NoDataError(`Cannot create ${this.collectionName}`);
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
            const objectId = new mongodb_1.ObjectId(idField.value);
            const projection = this.buildProjectionOption(selectedFields);
            const result = yield this.db.collection(this.collectionName).findOneAndUpdate({ _id: objectId }, { $set: data }, {
                projection,
                upsert: false,
                returnOriginal: false
            });
            if (result === null || result === void 0 ? void 0 : result.value) {
                const res = result.value;
                return res;
            }
            throw new core_1.NoDataError(`Cannot update ${this.collectionName}`);
        });
    }
    delete(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            if (!idField.value) {
                throw new core_1.NoDataError(`Cannot delete ${this.collectionName} - missing ID field`);
            }
            const projection = this.buildProjectionOption(selectedFields);
            const objectId = new mongodb_1.ObjectId(idField.value);
            const result = yield this.db.collection(this.collectionName).findOneAndDelete({ _id: objectId }, { projection });
            if (result === null || result === void 0 ? void 0 : result.value) {
                const res = result.value;
                return res;
            }
            throw new core_1.NoDataError(`Cannot update ${this.collectionName}`);
        });
    }
    findOne(filter, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const projection = this.buildProjectionOption(selectedFields);
            const query = this.db.collection(this.collectionName).findOne(filter, { projection });
            const data = yield query;
            if (data) {
                const res = data;
                return res;
            }
            throw new core_1.NoDataError(`Cannot find a result for ${this.collectionName} with filter: ${JSON.stringify(filter)}`);
        });
    }
    findBy(args, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const projection = this.buildProjectionOption(selectedFields);
            const filterQuery = queryBuilder_1.buildQuery(args === null || args === void 0 ? void 0 : args.filter);
            const query = this.db.collection(this.collectionName).find(filterQuery, { projection });
            const data = yield this.usePage(this.sortQuery(query, args === null || args === void 0 ? void 0 : args.orderBy), args === null || args === void 0 ? void 0 : args.page);
            if (data) {
                return data;
            }
            throw new core_1.NoDataError(`Cannot find all results for ${this.collectionName} with filter: ${JSON.stringify(args === null || args === void 0 ? void 0 : args.filter)}`);
        });
    }
    count(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.db.collection(this.collectionName).countDocuments(queryBuilder_1.buildQuery(filter));
        });
    }
    batchRead(relationField, ids, filter, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const projection = this.buildProjectionOption(selectedFields);
            filter = filter || {};
            filter[relationField] = { in: ids };
            const result = yield this.db.collection(this.collectionName).find(queryBuilder_1.buildQuery(filter), { projection }).toArray();
            if (result) {
                const resultsById = ids.map((objId) => {
                    const objectsForId = [];
                    for (const data of result) {
                        if (data[relationField].toString() === objId.toString()) {
                            objectsForId.push(data);
                        }
                    }
                    return objectsForId;
                });
                return resultsById;
            }
            throw new core_1.NoDataError(`No results for ${this.collectionName} query and batch read with filter: ${JSON.stringify(filter)}`);
        });
    }
    buildProjectionOption(selectedFields) {
        if (!(selectedFields === null || selectedFields === void 0 ? void 0 : selectedFields.length)) {
            return undefined;
        }
        return selectedFields
            .reduce((acc, field) => {
            return Object.assign(Object.assign({}, acc), { [field]: 1 });
        }, {});
    }
    verifyMongoDBPrimaryKey(modelName, primaryKey) {
        if (primaryKey.name === "_id" && primaryKey.type === "GraphbackObjectID") {
            return;
        }
        throw Error(`Model "${modelName}" must contain a "_id: GraphbackObjectID" primary key. Visit https://graphback.dev/docs/model/datamodel#mongodb to see how to set up one for your MongoDB model.`);
    }
    sortQuery(query, orderBy) {
        const sortOrder = {};
        if (orderBy) {
            if (orderBy.field) {
                sortOrder[orderBy.field] = 1;
            }
            if (orderBy.order) {
                if (orderBy.order.toLowerCase() === 'desc') {
                    sortOrder[orderBy.field] = -1;
                }
            }
        }
        return query.sort(sortOrder);
    }
    usePage(query, page) {
        if (!page) {
            return query.toArray();
        }
        const { offset, limit } = page;
        if (offset < 0) {
            throw new Error("Invalid offset value. Please use an offset of greater than or equal to 0 in queries");
        }
        if (limit < 1) {
            throw new Error("Invalid limit value. Please use a limit of greater than 1 in queries");
        }
        if (limit) {
            query = query.limit(limit);
        }
        if (offset) {
            query = query.skip(offset);
        }
        return query.toArray();
    }
}
exports.MongoDBDataProvider = MongoDBDataProvider;
//# sourceMappingURL=MongoDBDataProvider.js.map