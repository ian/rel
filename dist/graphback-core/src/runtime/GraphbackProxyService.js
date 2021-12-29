/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
export class GraphbackProxyService {
    proxiedService;
    constructor(service) {
        this.proxiedService = service;
    }
    async create(data, context, info) {
        return await this.proxiedService.create(data, context, info);
    }
    async update(data, context, info) {
        return await this.proxiedService.update(data, context, info);
    }
    async delete(data, context, info) {
        return await this.proxiedService.delete(data, context, info);
    }
    async findOne(args, context, info) {
        return await this.proxiedService.findOne(args, context, info);
    }
    async findBy(args, context, info, path) {
        return await this.proxiedService.findBy(args, context, info, path);
    }
    async updateBy(args, context, info) {
        return await this.proxiedService.updateBy(args, context, info);
    }
    async deleteBy(args, context, info) {
        return await this.proxiedService.deleteBy(args, context, info);
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
//# sourceMappingURL=GraphbackProxyService.js.map