"use strict";
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
exports.convertToSchemaFindQuery = exports.convertToResoverFindQuery = void 0;
var titleize_1 = __importDefault(require("titleize"));
var cypher_1 = require("../cypher");
var coercion_1 = require("../util/coercion");
var DEFAULT_OPTS = {
    findBy: ["id"],
};
function standardizeOpts(opts) {
    return Object.assign({}, DEFAULT_OPTS, typeof opts === "boolean" ? {} : opts);
}
function convertToResoverFindQuery(name, opts) {
    if (opts === void 0) { opts = {}; }
    var _a = standardizeOpts(opts), findBy = _a.findBy, where = _a.where;
    var findParamName = findBy
        .map(function (f, i) { return (i === 0 ? f : titleize_1.default(f)); })
        .join("Or");
    var handler = function (_, params) {
        return __awaiter(this, void 0, void 0, function () {
            var cypherQuery, where_1;
            return __generator(this, function (_a) {
                cypherQuery = [];
                cypherQuery.push("MATCH (node:" + name + ")");
                if (params[findParamName]) {
                    where_1 = findBy
                        .map(function (f) { return "node." + f + " = " + coercion_1.coerce(params[findParamName]); })
                        .join(" OR ");
                    cypherQuery.push("WHERE (" + where_1 + ")");
                }
                if (where)
                    cypherQuery.push("AND " + where);
                cypherQuery.push("RETURN node");
                cypherQuery.push("LIMIT 1;");
                return [2, cypher_1.cypher1(cypherQuery.join("\n")).then(function (res) { return res === null || res === void 0 ? void 0 : res.node; })];
            });
        });
    };
    return {
        name: "Find" + name,
        handler: handler,
    };
}
exports.convertToResoverFindQuery = convertToResoverFindQuery;
function convertToSchemaFindQuery(label, def, fields) {
    var name = "Find" + label;
    return {
        name: name,
        definition: name + "(id: UUID!): " + label,
    };
}
exports.convertToSchemaFindQuery = convertToSchemaFindQuery;
//# sourceMappingURL=find.js.map