"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDataError = void 0;
/**
 * Error thrown when database query succeded without any data
 * which is not handled by GraphQL specification
 */
class NoDataError extends Error {
    constructor(message) {
        super(`No result from database: ${message}`);
    }
}
exports.NoDataError = NoDataError;
//# sourceMappingURL=NoDataError.js.map