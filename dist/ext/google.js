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
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocode = exports.Geo = void 0;
var client = require("@google/maps").createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise,
});
var Geo = (function () {
    function Geo(_a) {
        var lat = _a.lat, lng = _a.lng;
        this.lat = lat;
        this.lng = lng;
    }
    return Geo;
}());
exports.Geo = Geo;
function geocode(rawAddress, tries) {
    if (tries === void 0) { tries = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var res, address, _a, lat, lng, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!rawAddress || rawAddress === "")
                        return [2, null];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, client
                            .geocode({
                            address: rawAddress,
                        })
                            .asPromise()
                            .then(function (response) { return response.json.results[0]; })
                            .catch(function (err) {
                            console.log(err);
                        })];
                case 2:
                    res = _b.sent();
                    if (!res)
                        return [2, null];
                    address = res.formatted_address;
                    _a = res.geometry.location, lat = _a.lat, lng = _a.lng;
                    return [2, {
                            address: address,
                            geo: new Geo({
                                lat: lat,
                                lng: lng,
                            }),
                        }];
                case 3:
                    err_1 = _b.sent();
                    console.log("Geocode Error", err_1.message);
                    console.log(err_1);
                    if (tries < 2) {
                        return [2, geocode(rawAddress, tries + 1)];
                    }
                    else {
                        console.log("FINAL Geocode Error", err_1.message);
                        console.log("Address Components", JSON.stringify(res.address_components, null, 2));
                        return [2, null];
                    }
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
exports.geocode = geocode;
exports.default = client;
//# sourceMappingURL=google.js.map