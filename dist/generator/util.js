"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = void 0;
var coercion_1 = require("../util/coercion");
function queryBuilder(queryOpts) {
    var match = queryOpts.match, geo = queryOpts.geo, order = queryOpts.order, filter = queryOpts.filter, skip = queryOpts.skip, limit = queryOpts.limit, where = queryOpts.where;
    var cypherWhere = [];
    var cypherQuery = [];
    if (where)
        cypherWhere.push(where);
    cypherQuery.push("MATCH " + match);
    if (geo === null || geo === void 0 ? void 0 : geo.boundingBox) {
        var _a = geo.boundingBox, southWest = _a.southWest, northEast = _a.northEast;
        cypherQuery.push("\n        WITH node, point({ latitude: " + southWest.lat + ", longitude: " + southWest.lng + " }) AS southWest, point({ latitude: " + northEast.lat + ", longitude: " + northEast.lng + " }) AS northEast\n        ");
        cypherWhere.push("node.geo > southWest");
        cypherWhere.push("node.geo < northEast");
    }
    if (filter) {
        Object.keys(filter).map(function (key) {
            var val = filter[key];
            cypherWhere.push("node." + key + " = " + coercion_1.coerce(val));
        });
    }
    if (cypherWhere.length > 0) {
        cypherQuery.push("WHERE " + cypherWhere.join(" AND "));
    }
    cypherQuery.push("RETURN node");
    if (order)
        cypherQuery.push("ORDER BY node." + order);
    if (skip)
        cypherQuery.push("SKIP " + skip);
    if (limit)
        cypherQuery.push("LIMIT " + limit);
    return cypherQuery.join("\n");
}
exports.queryBuilder = queryBuilder;
//# sourceMappingURL=util.js.map