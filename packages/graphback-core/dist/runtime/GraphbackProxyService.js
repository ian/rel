"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphbackProxyService = void 0;
/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
class GraphbackProxyService {
    constructor(service) {
        this.proxiedService = service;
    }
    create(data, context, info) {
        return this.proxiedService.create(data, context, info);
    }
    update(data, context, info) {
        return this.proxiedService.update(data, context, info);
    }
    delete(data, context, info) {
        return this.proxiedService.delete(data, context, info);
    }
    findOne(args, context, info) {
        return this.proxiedService.findOne(args, context, info);
    }
    findBy(args, context, info, path) {
        return this.proxiedService.findBy(args, context, info, path);
    }
    subscribeToCreate(filter, context) {
        return this.proxiedService.subscribeToCreate(filter, context);
    }
    subscribeToUpdate(filter, context) {
        return this.proxiedService.subscribeToUpdate(filter, context);
    }
    subscribeToDelete(filter, context) {
        return this.proxiedService.subscribeToDelete(filter, context);
    }
    batchLoadData(relationField, id, filter, context, info) {
        return this.proxiedService.batchLoadData(relationField, id, filter, context, info);
    }
}
exports.GraphbackProxyService = GraphbackProxyService;
//# sourceMappingURL=GraphbackProxyService.js.map