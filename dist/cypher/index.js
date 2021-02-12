"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cypher1 = exports.cypher = exports.cypherRaw = void 0;
var integer_js_1 = require("neo4j-driver/lib/integer.js");
var boxen_1 = __importDefault(require("boxen"));
var connection_1 = __importDefault(require("../connection"));
var geo_1 = require("../util/geo");
function cypherRaw(query) {
    return __awaiter(this, void 0, void 0, function () {
        function beautifyCypher(query) {
            return query
                .split("\n")
                .map(function (s) { return s.trim(); })
                .join("\n");
        }
        var session;
        return __generator(this, function (_a) {
            if (process.env.NEO4J_DEBUG === "true") {
                console.log(boxen_1.default(beautifyCypher(query), { dimBorder: true, padding: 1, margin: 1 }));
            }
            session = connection_1.default.session();
            return [2, session.run(beautifyCypher(query))];
        });
    });
}
exports.cypherRaw = cypherRaw;
function cypher(query) {
    return __awaiter(this, void 0, void 0, function () {
        var res, sanitize, recordMapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, cypherRaw(query)];
                case 1:
                    res = _a.sent();
                    sanitize = function (maybeObject) {
                        switch (true) {
                            case maybeObject === undefined:
                                return null;
                            case integer_js_1.isInt(maybeObject):
                                return maybeObject.toString();
                            case maybeObject.constructor.name === "Point":
                                return new geo_1.Geo({
                                    lat: maybeObject.y,
                                    lng: maybeObject.x,
                                });
                            case typeof maybeObject === "object":
                                return Object.keys(maybeObject).reduce(function (acc, key) {
                                    acc[key] = sanitize(maybeObject[key]);
                                    return acc;
                                }, {});
                            default:
                                return maybeObject;
                        }
                    };
                    recordMapper = function (rec) {
                        var res = {};
                        rec.keys.forEach(function (key) {
                            var node = rec.get(key);
                            if (integer_js_1.isInt(node)) {
                                res[key] = node.toNumber();
                            }
                            else {
                                var labels = (node === null || node === void 0 ? void 0 : node.labels) || [];
                                var properties = (node === null || node === void 0 ? void 0 : node.properties) || {};
                                var mapped = __assign({}, properties);
                                if (labels)
                                    mapped.__typename = labels[0];
                                res[key] = sanitize(mapped);
                            }
                        });
                        return res;
                    };
                    return [2, res.records.map(recordMapper)];
            }
        });
    });
}
exports.cypher = cypher;
function cypher1(query) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, cypher(query)];
                case 1:
                    res = _a.sent();
                    return [2, res[0]];
            }
        });
    });
}
exports.cypher1 = cypher1;
__exportStar(require("./node"), exports);
__exportStar(require("./relationship"), exports);
//# sourceMappingURL=index.js.map