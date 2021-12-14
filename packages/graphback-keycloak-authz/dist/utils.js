"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.checkAuthRulesForSelections = exports.checkAuthRulesForInput = exports.getEmptyServiceConfig = void 0;
const keycloak_connect_graphql_1 = require("keycloak-connect-graphql");
const supportedCrudOperations = ['create', 'read', 'update', 'delete'];
function getEmptyServiceConfig() {
    const serviceConfig = {};
    for (const operation of supportedCrudOperations) {
        serviceConfig[operation] = { roles: [] };
    }
    return serviceConfig;
}
exports.getEmptyServiceConfig = getEmptyServiceConfig;
/**
 * Checks if user is allowed to create/update particular field
 */
function checkAuthRulesForInput(context, authConfig, inputKeys) {
    if (authConfig.updateFields) {
        for (const inputKey of inputKeys) {
            if (authConfig.updateFields[inputKey]) {
                const { roles } = authConfig.updateFields[inputKey];
                if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                    throw new UnauthorizedError();
                }
            }
        }
    }
}
exports.checkAuthRulesForInput = checkAuthRulesForInput;
/**
 * Checks if user is allowed to request particular field
 */
function checkAuthRulesForSelections(context, authConfig, selectedFields) {
    if (authConfig.returnFields && selectedFields && selectedFields) {
        for (const selectedField of selectedFields) {
            if (authConfig.returnFields[selectedField]) {
                const { roles } = authConfig.returnFields[selectedField];
                if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                    throw new UnauthorizedError(`Unauthorized to fetch: ${selectedField}`);
                }
            }
        }
    }
}
exports.checkAuthRulesForSelections = checkAuthRulesForSelections;
/**
 * Custom Error class. The code property will be propagated back to the client side
 * for proper error handling
 */
class UnauthorizedError extends Error {
    constructor(message = "User is not authorized.") {
        super(message);
        this.code = 'FORBIDDEN';
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=utils.js.map