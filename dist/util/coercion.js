"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coerce = void 0;
var geo_1 = require("./geo");
function coerce(val) {
    switch (true) {
        case val instanceof geo_1.Geo:
            return "point({ latitude: " + val.lat + ", longitude: " + val.lng + ", crs: 'WGS-84' })";
        case typeof val === "string":
            return "\"" + val.replace(/"/g, '\\"') + "\"";
        case val === null:
        case val === undefined:
            return "null";
        case typeof val === "object":
            return Object.keys(val).reduce(function (acc, key) {
                acc[key] = coerce(val[key]);
                return acc;
            }, {});
        default:
            return val;
    }
}
exports.coerce = coerce;
//# sourceMappingURL=coercion.js.map