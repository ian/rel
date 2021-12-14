"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoDbProvider = void 0;
const MongoDBDataProvider_1 = require("./MongoDBDataProvider");
/**
 * Creates a new KnexDBDataProvider
 *
 * @param {Db} db - MongoDb connection
 */
function createMongoDbProvider(db) {
    return (model) => {
        return new MongoDBDataProvider_1.MongoDBDataProvider(model, db);
    };
}
exports.createMongoDbProvider = createMongoDbProvider;
//# sourceMappingURL=createMongoDbProvider.js.map