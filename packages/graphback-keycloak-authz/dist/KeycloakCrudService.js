"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakCrudService = void 0;
const keycloak_connect_graphql_1 = require("keycloak-connect-graphql");
const core_1 = require("@graphback/core");
const utils_1 = require("./utils");
/**
 * This custom CRUD Service shows another potential way to add auth
 *
 * This is actually quite nice and clean but it does not allow for field level auth.
 * It's still a possibility that we could go with though!
 */
class KeycloakCrudService extends core_1.GraphbackProxyService {
    constructor(model, { service, authConfig }) {
        super(service);
        this.authConfig = authConfig || utils_1.getEmptyServiceConfig();
        this.model = model;
    }
    create(data, context, info) {
        if (this.authConfig.create && this.authConfig.create.roles && this.authConfig.create.roles.length > 0) {
            const { roles } = this.authConfig.create;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        utils_1.checkAuthRulesForInput(context, this.authConfig, Object.keys(data));
        return super.create(data, context, info);
    }
    update(data, context, info) {
        if (this.authConfig.update && this.authConfig.update.roles && this.authConfig.update.roles.length > 0) {
            const { roles } = this.authConfig.update;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        utils_1.checkAuthRulesForInput(context, this.authConfig, Object.keys(data));
        return super.update(data, context, info);
    }
    delete(data, context, info) {
        if (this.authConfig.delete && this.authConfig.delete.roles && this.authConfig.delete.roles.length > 0) {
            const { roles } = this.authConfig.delete;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        return super.delete(data, context, info);
    }
    findOne(args, context, info) {
        if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
            const { roles } = this.authConfig.read;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        let selectedFields;
        if (info) {
            selectedFields = core_1.getSelectedFieldsFromResolverInfo(info, this.model);
        }
        utils_1.checkAuthRulesForSelections(context, this.authConfig, selectedFields);
        return super.findOne(args, context, info);
    }
    findBy(args, context, info, path) {
        if (this.authConfig.read && this.authConfig.read.roles && this.authConfig.read.roles.length > 0) {
            const { roles } = this.authConfig.read;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        if (this.authConfig.filterUsingAuthInfo && context.kauth) {
            if (typeof this.authConfig.filterUsingAuthInfo !== 'function') {
                throw new Error("Wrong auth filter implementation");
            }
            args.filter = this.authConfig.filterUsingAuthInfo(args.filter, context.kauth.accessToken.content);
        }
        let selectedFields;
        if (info) {
            selectedFields = core_1.getSelectedFieldsFromResolverInfo(info, this.model, path);
        }
        utils_1.checkAuthRulesForSelections(context, this.authConfig, selectedFields);
        return super.findBy(args, context, info, path);
    }
    subscribeToCreate(filter, context) {
        if (this.authConfig.subCreate && this.authConfig.subCreate.roles && this.authConfig.subCreate.roles.length > 0) {
            const { roles } = this.authConfig.subCreate;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        return super.subscribeToCreate(filter, context);
    }
    subscribeToUpdate(filter, context) {
        if (this.authConfig.subUpdate && this.authConfig.subUpdate.roles && this.authConfig.subUpdate.roles.length > 0) {
            const { roles } = this.authConfig.subUpdate;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        return super.subscribeToUpdate(filter, context);
    }
    subscribeToDelete(filter, context) {
        if (this.authConfig.subDelete && this.authConfig.subDelete.roles && this.authConfig.subDelete.roles.length > 0) {
            const { roles } = this.authConfig.subDelete;
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        return super.subscribeToDelete(filter, context);
    }
    batchLoadData(relationField, id, filter, context, info) {
        var _a, _b, _c, _d;
        const relationshipMetadata = this.model.relationships.find((r) => r.relationForeignKey === relationField);
        const modelRelationshipField = relationshipMetadata ? relationshipMetadata.ownerField.name : relationField;
        if (((_a = this.authConfig) === null || _a === void 0 ? void 0 : _a.relations) && ((_c = (_b = this.authConfig) === null || _b === void 0 ? void 0 : _b.relations[modelRelationshipField]) === null || _c === void 0 ? void 0 : _c.roles.length) > 0) {
            const { roles } = (_d = this.authConfig) === null || _d === void 0 ? void 0 : _d.relations[modelRelationshipField];
            if (!keycloak_connect_graphql_1.isAuthorizedByRole(roles, context)) {
                throw new utils_1.UnauthorizedError();
            }
        }
        return super.batchLoadData(relationField, id, filter, context, info);
    }
}
exports.KeycloakCrudService = KeycloakCrudService;
//# sourceMappingURL=KeycloakCrudService.js.map