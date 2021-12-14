"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnexDBDataProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const knexQueryMapper_1 = require("./knexQueryMapper");
/**
 * Knex.js database data provider exposing basic CRUD operations that works with all databases that knex supports.
 * Layer is tested with following databases:
 *
 * - SQLite (by `SQLiteKnexDBDataProvider`)
 * - MySQL (MariaDB)
 * - Postgres
 *
 * NOTE: For SQLite use dedicated `SQLiteKnexDBDataProvider` that implements more speficic creation method to avoid the not supported `returning()`
 * statement.
 */
//tslint:disable-next-line: no-any
class KnexDBDataProvider {
    constructor(model, db) {
        this.db = db;
        this.queryBuilder = knexQueryMapper_1.createKnexQueryMapper(db);
        this.tableMap = core_1.buildModelTableMap(model.graphqlType);
        this.tableName = this.tableMap.tableName;
    }
    create(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data: createData } = core_1.getDatabaseArguments(this.tableMap, data);
            //tslint:disable-next-line: await-promise
            const dbResult = yield this.db(this.tableName).insert(createData).returning(this.getSelectedFields(selectedFields));
            if (dbResult && dbResult[0]) {
                return dbResult[0];
            }
            throw new core_1.NoDataError(`Cannot create ${this.tableName}`);
        });
    }
    update(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField, data: updateData } = core_1.getDatabaseArguments(this.tableMap, data);
            //tslint:disable-next-line: await-promise
            const updateResult = yield this.db(this.tableName).update(updateData, this.getSelectedFields(selectedFields)).where(idField.name, '=', idField.value);
            if (updateResult && updateResult[0]) {
                return updateResult[0];
            }
            throw new core_1.NoDataError(`Cannot update ${this.tableName}`);
        });
    }
    delete(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            //tslint:disable-next-line: await-promise
            const dbResult = yield this.db(this.tableName).where(idField.name, '=', idField.value).delete(this.getSelectedFields(selectedFields));
            if (dbResult && dbResult[0]) {
                return dbResult[0];
            }
            throw new core_1.NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);
        });
    }
    findOne(args, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(args).first();
            }
            catch (err) {
                throw new core_1.NoDataError(`Cannot find a result for ${this.tableName} with filter: ${JSON.stringify(args)}`);
            }
            return result;
        });
    }
    findBy(args, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let query = this.queryBuilder.buildQuery(args === null || args === void 0 ? void 0 : args.filter).select(this.getSelectedFields(selectedFields)).from(this.tableName);
            if (args === null || args === void 0 ? void 0 : args.orderBy) {
                query = query.orderBy(args.orderBy.field, args.orderBy.order);
            }
            //tslint:disable-next-line: await-promise
            const dbResult = yield this.usePage(query, args === null || args === void 0 ? void 0 : args.page);
            if (dbResult) {
                return dbResult;
            }
            throw new core_1.NoDataError(`No results for ${this.tableName} query and filter: ${JSON.stringify(args === null || args === void 0 ? void 0 : args.filter)}`);
        });
    }
    count(filter) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dbResult = yield this.queryBuilder.buildQuery(filter).from(this.tableName).count();
            const count = Object.values(dbResult[0])[0];
            return parseInt(count, 10);
        });
    }
    batchRead(relationField, ids, filter, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const dbResult = yield this.queryBuilder.buildQuery(filter).select(this.getSelectedFields(selectedFields)).from(this.tableName).whereIn(relationField, ids);
            if (dbResult) {
                const resultsById = ids.map((id) => dbResult.filter((data) => {
                    return data[relationField].toString() === id.toString();
                }));
                return resultsById;
            }
            throw new core_1.NoDataError(`No results for ${this.tableName} and id: ${JSON.stringify(ids)}`);
        });
    }
    getSelectedFields(selectedFields) {
        return (selectedFields === null || selectedFields === void 0 ? void 0 : selectedFields.length) ? selectedFields : "*";
    }
    usePage(query, page) {
        if (!page) {
            return query;
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
            query = query.offset(offset);
        }
        return query;
    }
}
exports.KnexDBDataProvider = KnexDBDataProvider;
//# sourceMappingURL=KnexDBDataProvider.js.map