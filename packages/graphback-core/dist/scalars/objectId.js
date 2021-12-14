"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectIDTimestamp = exports.parseObjectID = exports.isObjectID = void 0;
const bson_1 = require("bson");
/* eslint-disable */
function isObjectID(value) {
    if (value instanceof bson_1.ObjectID) {
        return true;
    }
    try {
        const BsonExtObjectID = require('bson-ext').ObjectID;
        return value instanceof BsonExtObjectID;
    }
    catch (_a) { }
    return false;
}
exports.isObjectID = isObjectID;
function parseObjectID(value) {
    let ObjectID = bson_1.ObjectID;
    try {
        ObjectID = require('bson-ext').ObjectID; // always prefer the native bson extension which is more performant than js-bson
    }
    catch (_a) { }
    return new ObjectID(value);
}
exports.parseObjectID = parseObjectID;
function getObjectIDTimestamp(value) {
    return value.getTimestamp();
}
exports.getObjectIDTimestamp = getObjectIDTimestamp;
/* eslint-enable */
//# sourceMappingURL=objectId.js.map