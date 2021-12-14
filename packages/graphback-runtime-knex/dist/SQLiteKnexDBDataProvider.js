"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLiteKnexDBDataProvider = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const KnexDBDataProvider_1 = require("./KnexDBDataProvider");
/**
 * Knex.js database data provider exposing basic CRUD operations.
 *
 * NOTE: This class implements SQLite specific implementaion
 */
//tslint:disable-next-line: no-any
class SQLiteKnexDBDataProvider extends KnexDBDataProvider_1.KnexDBDataProvider {
    constructor(model, db) {
        super(model, db);
    }
    create(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data: createData } = core_1.getDatabaseArguments(this.tableMap, data);
            //tslint:disable-next-line: await-promise
            const [id] = yield this.db(this.tableName).insert(createData);
            //tslint:disable-next-line: await-promise
            const dbResult = yield this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(this.tableMap.idField, '=', id);
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
            const updateResult = yield this.db(this.tableName).update(updateData).where(idField.name, '=', idField.value);
            if (updateResult === 1) {
                //tslint:disable-next-line: await-promise
                const dbResult = yield this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(idField.name, '=', idField.value);
                if (dbResult && dbResult[0]) {
                    return dbResult[0];
                }
            }
            throw new core_1.NoDataError(`Cannot update ${this.tableName}`);
        });
    }
    delete(data, selectedFields) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { idField } = core_1.getDatabaseArguments(this.tableMap, data);
            //tslint:disable-next-line: await-promise
            const beforeDelete = yield this.db.select(this.getSelectedFields(selectedFields)).from(this.tableName).where(idField.name, '=', idField.value);
            //tslint:disable-next-line: await-promise
            const dbResult = yield this.db(this.tableName).where(idField.name, '=', idField.value).del();
            if (dbResult && beforeDelete[0]) {
                return beforeDelete[0];
            }
            throw new core_1.NoDataError(`Cannot delete ${this.tableName} with ${JSON.stringify(data)}`);
        });
    }
}
exports.SQLiteKnexDBDataProvider = SQLiteKnexDBDataProvider;
//# sourceMappingURL=SQLiteKnexDBDataProvider.js.map