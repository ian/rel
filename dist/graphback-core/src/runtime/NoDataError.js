/**
 * Error thrown when database query succeded without any data
 * which is not handled by GraphQL specification
 */
export class NoDataError extends Error {
    constructor(message) {
        super(`No result from database: ${message}`);
    }
}
//# sourceMappingURL=NoDataError.js.map