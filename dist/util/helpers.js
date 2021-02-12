"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectId = void 0;
function objectId(objOrId) {
    if (typeof objOrId === "string")
        return objOrId;
    return objOrId.id;
}
exports.objectId = objectId;
//# sourceMappingURL=helpers.js.map