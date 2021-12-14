"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowOnConflict = exports.ClientSideWins = exports.ServerSideWins = exports.DataSyncFieldNames = exports.ConflictError = exports.getModelConfigFromGlobal = exports.isDataSyncService = exports.getDataSyncAnnotationData = exports.isDataSyncType = exports.isDataSyncModel = void 0;
const tslib_1 = require("tslib");
const graphql_metadata_1 = require("graphql-metadata");
const services_1 = require("./services");
function isDataSyncModel(model) {
    return isDataSyncType(model.graphqlType);
}
exports.isDataSyncModel = isDataSyncModel;
function isDataSyncType(graphqlType) {
    return !!(graphql_metadata_1.parseMetadata('datasync', graphqlType));
}
exports.isDataSyncType = isDataSyncType;
function getDataSyncAnnotationData(model) {
    return graphql_metadata_1.parseMetadata('datasync', model.graphqlType);
}
exports.getDataSyncAnnotationData = getDataSyncAnnotationData;
function isDataSyncService(service) {
    if (service instanceof services_1.DataSyncCRUDService) {
        return service;
    }
    return undefined;
}
exports.isDataSyncService = isDataSyncService;
/**
 * Function to get conflict configuration of specific model from specified global configuration
 * @param {string} modelName Name of the model's GraphQL type
 * @param {GlobalConflictConfig} globalConfig Specified global config
 */
function getModelConfigFromGlobal(modelName, globalConfig = {}) {
    const _a = Object.assign({ enabled: false, conflictResolution: exports.ClientSideWins, deltaTTL: 172800 }, globalConfig), { models } = _a, defaultConfig = tslib_1.__rest(_a, ["models"]);
    if (models) {
        return Object.assign(Object.assign({}, defaultConfig), models[modelName]);
    }
    else {
        return defaultConfig;
    }
}
exports.getModelConfigFromGlobal = getModelConfigFromGlobal;
/**
 * Error that signifies conflict between server-side and client-side data
 */
class ConflictError extends Error {
    constructor(stateMap) {
        super('A conflict has occurred');
        this.conflictInfo = stateMap;
    }
}
exports.ConflictError = ConflictError;
exports.DataSyncFieldNames = {
    version: '_version',
    lastUpdatedAt: '_lastUpdatedAt',
    deleted: '_deleted',
    ttl: "_ttl"
};
/**
 * The ServerSideWins conflict resolution strategy
 */
exports.ServerSideWins = {
    resolveUpdate(conflict) {
        const { serverData, serverDiff, clientDiff, base } = conflict;
        if (!base || !serverData || serverData[exports.DataSyncFieldNames.deleted] === true) {
            throw new ConflictError(conflict);
        }
        const resolved = Object.assign(serverData, clientDiff, serverDiff);
        return resolved;
    },
    resolveDelete(conflict) {
        throw new ConflictError(conflict);
    }
};
/**
 * The ClientSideWins conflict resolution strategy
 */
exports.ClientSideWins = {
    resolveUpdate(conflict) {
        const { serverData, clientDiff } = conflict;
        const resolved = Object.assign(serverData, clientDiff);
        if (serverData[exports.DataSyncFieldNames.deleted] === true) {
            resolved[exports.DataSyncFieldNames.deleted] = false;
        }
        return resolved;
    },
    resolveDelete(conflict) {
        const { serverData, clientData } = conflict;
        if (serverData[exports.DataSyncFieldNames.deleted] === true) {
            throw new ConflictError(conflict);
        }
        const resolved = Object.assign({}, serverData, { [exports.DataSyncFieldNames.deleted]: true });
        return resolved;
    }
};
exports.ThrowOnConflict = {
    resolveUpdate(conflict) {
        throw new ConflictError(conflict);
    },
    resolveDelete(conflict) {
        throw new ConflictError(conflict);
    }
};
//# sourceMappingURL=util.js.map