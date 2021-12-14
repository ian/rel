"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKnexDbProvider = void 0;
const KnexDBDataProvider_1 = require("./KnexDBDataProvider");
/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Knex} db - Knex database configuration object
 */
function createKnexDbProvider(db) {
    return (model) => {
        return new KnexDBDataProvider_1.KnexDBDataProvider(model, db);
    };
}
exports.createKnexDbProvider = createKnexDbProvider;
//# sourceMappingURL=createKnexDbProvider.js.map