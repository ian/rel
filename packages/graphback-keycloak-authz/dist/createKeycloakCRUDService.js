"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeycloakCRUDService = void 0;
const KeycloakCrudService_1 = require("./KeycloakCrudService");
/**
 * Creates a new KeycloakCrudService by wrapping original service.
 * This method can work with both CRUDService (default) and DataSyncService
 *
 * @param authConfig  - CRUD auth config for entire model
 *  @param serviceCreator - function that creates wrapper service
 */
function createKeycloakCRUDService(authConfigList, serviceCreator) {
    if (!authConfigList || !serviceCreator) {
        throw new Error("Missing required arguments to create keycloak service");
    }
    return (model, dataProvider) => {
        const service = serviceCreator(model, dataProvider);
        const objConfig = authConfigList[model.graphqlType.name];
        const keycloakService = new KeycloakCrudService_1.KeycloakCrudService(model, { service, authConfig: objConfig });
        return keycloakService;
    };
}
exports.createKeycloakCRUDService = createKeycloakCRUDService;
//# sourceMappingURL=createKeycloakCRUDService.js.map