"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSyncCRUDService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@graphback/core");
const util_1 = require("../util");
/**
 * CRUD Service for datasync
 */
class DataSyncCRUDService extends core_1.CRUDService {
    constructor(model, db, config) {
        super(model, db, config);
    }
    /**
     * sync
     * For delta queries
     */
    sync(lastSync, info, filter, limit) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let selectedFields;
            if (info) {
                selectedFields = core_1.getSelectedFieldsFromResolverInfo(info, this.model, 'items');
                selectedFields.push(util_1.DataSyncFieldNames.deleted);
            }
            const res = yield this.db.sync(lastSync, selectedFields, filter, limit);
            return {
                items: res,
                lastSync: new Date(),
                limit
            };
        });
    }
}
exports.DataSyncCRUDService = DataSyncCRUDService;
//# sourceMappingURL=DataSyncCRUDService.js.map