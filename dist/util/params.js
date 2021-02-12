"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramify = exports.paramsToCypher = exports.paramsBuilder = exports.TIMESTAMPS = void 0;
var moment_1 = __importDefault(require("moment"));
var uuid_1 = require("uuid");
var coercion_1 = require("./coercion");
var TIMESTAMPS;
(function (TIMESTAMPS) {
    TIMESTAMPS["CREATED"] = "createdAt";
    TIMESTAMPS["UPDATED"] = "updatedAt";
})(TIMESTAMPS = exports.TIMESTAMPS || (exports.TIMESTAMPS = {}));
function paramsBuilder(params, opts) {
    if (opts === void 0) { opts = {}; }
    var _a = opts.id, id = _a === void 0 ? false : _a, _b = opts.timestamps, timestamps = _b === void 0 ? false : _b, _c = opts.except, except = _c === void 0 ? null : _c, _d = opts.only, only = _d === void 0 ? null : _d;
    var res = {};
    var fieldKeys = Object.keys(params);
    if (only)
        fieldKeys = fieldKeys.filter(function (k) { return only.includes(k); });
    else if (except)
        fieldKeys = fieldKeys.filter(function (k) { return !except.includes(k); });
    for (var _i = 0, fieldKeys_1 = fieldKeys; _i < fieldKeys_1.length; _i++) {
        var key = fieldKeys_1[_i];
        res[key] = params[key];
    }
    if (id)
        res["id"] = uuid_1.v4();
    if (timestamps) {
        if (timestamps === TIMESTAMPS.CREATED || timestamps === true) {
            res["createdAt"] = moment_1.default().toISOString();
        }
        if (timestamps === TIMESTAMPS.UPDATED || timestamps === true) {
            res["updatedAt"] = moment_1.default().toISOString();
        }
    }
    return res;
}
exports.paramsBuilder = paramsBuilder;
function paramsToCypher(params, opts) {
    if (opts === void 0) { opts = {}; }
    var _a = opts.separator, separator = _a === void 0 ? ":" : _a, _b = opts.prefix, prefix = _b === void 0 ? null : _b;
    function mapper(key) {
        var field = prefix ? "" + prefix + key : key;
        var value = coercion_1.coerce(this[key]);
        return field + " " + separator + " " + value;
    }
    return Object.keys(params).map(mapper, params).join(" , ");
}
exports.paramsToCypher = paramsToCypher;
function paramify(params, opts) {
    if (opts === void 0) { opts = {}; }
    return paramsToCypher(paramsBuilder(params, opts), opts);
}
exports.paramify = paramify;
//# sourceMappingURL=params.js.map