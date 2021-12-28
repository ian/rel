"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphbackOperationType = void 0;
/**
 * Enum with list of possible resolvers that can be created
 */
/* eslint-disable no-shadow */
var GraphbackOperationType;
(function (GraphbackOperationType) {
    GraphbackOperationType["CREATE"] = "create";
    GraphbackOperationType["UPDATE"] = "update";
    GraphbackOperationType["UPDATE_BY"] = "updateBy";
    GraphbackOperationType["FIND"] = "find";
    GraphbackOperationType["FIND_ONE"] = "findOne";
    GraphbackOperationType["DELETE"] = "delete";
    GraphbackOperationType["DELETE_BY"] = "deleteBy";
    GraphbackOperationType["SUBSCRIPTION_CREATE"] = "subCreate";
    GraphbackOperationType["SUBSCRIPTION_UPDATE"] = "subUpdate";
    GraphbackOperationType["SUBSCRIPTION_DELETE"] = "subDelete";
})(GraphbackOperationType = exports.GraphbackOperationType || (exports.GraphbackOperationType = {}));
/* eslint-enable no-shadow */
//# sourceMappingURL=GraphbackOperationType.js.map