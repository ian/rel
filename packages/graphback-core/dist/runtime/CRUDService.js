"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRUDService = void 0;
const tslib_1 = require("tslib");
const DataLoader = require("dataloader");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const __1 = require("..");
const getSelectedFieldsFromResolverInfo_1 = require("../plugin/getSelectedFieldsFromResolverInfo");
const createInMemoryFilterPredicate_1 = require("./createInMemoryFilterPredicate");
/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
//tslint:disable-next-line: no-any
class CRUDService {
    constructor(model, db, config) {
        this.model = model;
        this.crudOptions = config.crudOptions;
        this.db = db;
        this.pubSub = config.pubSub;
    }
    create(data, context, info) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let selectedFields;
            if (info && !this.crudOptions.subCreate) {
                selectedFields = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model);
            }
            const result = yield this.db.create(data, selectedFields);
            if (this.pubSub && this.crudOptions.subCreate) {
                const topic = this.subscriptionTopicMapping(__1.GraphbackOperationType.CREATE, this.model.graphqlType.name);
                //TODO use subscription name mapping
                const payload = this.buildEventPayload('new', result);
                this.pubSub.publish(topic, payload).catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
                });
            }
            return result;
        });
    }
    update(data, context, info) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let selectedFields;
            if (info && !this.crudOptions.subUpdate) {
                selectedFields = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model);
            }
            const result = yield this.db.update(data, selectedFields);
            if (this.pubSub && this.crudOptions.subUpdate) {
                const topic = this.subscriptionTopicMapping(__1.GraphbackOperationType.UPDATE, this.model.graphqlType.name);
                //TODO use subscription name mapping
                const payload = this.buildEventPayload('updated', result);
                this.pubSub.publish(topic, payload).catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
                });
            }
            return result;
        });
    }
    delete(data, context, info) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            //if (info && !this.crudOptions.subDelete) { SHOULD ALWAYS LOOK FOR PROJECTION
            const selectedFields = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model);
            //}
            const result = yield this.db.delete(data, selectedFields);
            if (this.pubSub && this.crudOptions.subDelete) {
                const topic = this.subscriptionTopicMapping(__1.GraphbackOperationType.DELETE, this.model.graphqlType.name);
                const payload = this.buildEventPayload('deleted', result);
                this.pubSub.publish(topic, payload).catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
                });
            }
            return result;
        });
    }
    findOne(args, context, info) {
        let selectedFields;
        if (info) {
            selectedFields = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model);
        }
        return this.db.findOne(args, selectedFields);
    }
    findBy(args, context, info, path) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let selectedFields;
            let requestedCount = false;
            if (info) {
                selectedFields = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model, path);
                requestedCount = path === 'items' && getSelectedFieldsFromResolverInfo_1.getResolverInfoFieldsList(info).some((field) => field === "count");
            }
            const items = yield this.db.findBy(args, selectedFields);
            // set page values for returned object
            const resultPageInfo = Object.assign({ offset: 0 }, args === null || args === void 0 ? void 0 : args.page);
            let count;
            if (requestedCount) {
                count = yield this.db.count(args.filter);
            }
            return Object.assign({ items,
                count, offset: 0 }, resultPageInfo);
        });
    }
    subscribeToCreate(filter) {
        if (!this.pubSub) {
            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const operationType = __1.GraphbackOperationType.CREATE;
        const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = __1.getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(createSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate_1.createInMemoryFilterPredicate(filter);
        return graphql_subscriptions_1.withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    subscribeToUpdate(filter) {
        if (!this.pubSub) {
            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const operationType = __1.GraphbackOperationType.UPDATE;
        const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = __1.getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(updateSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate_1.createInMemoryFilterPredicate(filter);
        return graphql_subscriptions_1.withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    subscribeToDelete(filter) {
        if (!this.pubSub) {
            throw Error(`Missing PubSub implementation in CRUDService`);
        }
        const operationType = __1.GraphbackOperationType.DELETE;
        const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = __1.getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(deleteSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate_1.createInMemoryFilterPredicate(filter);
        return graphql_subscriptions_1.withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    batchLoadData(relationField, id, filter, context, info) {
        const selectedFields = [];
        if (info) {
            const selectedFieldsFromInfo = getSelectedFieldsFromResolverInfo_1.getSelectedFieldsFromResolverInfo(info, this.model);
            selectedFields.push(...selectedFieldsFromInfo);
            // only push the relation field if there are fields selected
            // because all fields will be selected otherwise
            if (selectedFields.length) {
                selectedFields.push(relationField);
            }
        }
        const fetchedKeys = selectedFields.join('-');
        const keyName = `${this.model.graphqlType.name}-${__1.upperCaseFirstChar(relationField)}-${fetchedKeys}-${JSON.stringify(filter)}-DataLoader`;
        if (!context[keyName]) {
            context[keyName] = new DataLoader((keys) => {
                return this.db.batchRead(relationField, keys, filter, selectedFields);
            });
        }
        // eslint-disable-next-line no-null/no-null
        if (id === undefined || id === null) {
            return [];
        }
        return context[keyName].load(id);
    }
    /**
     * Provides way to map runtime topics for subscriptions for specific types and object names
     */
    subscriptionTopicMapping(triggerType, objectName) {
        return `${triggerType}_${objectName}`.toUpperCase();
    }
    buildEventPayload(action, result) {
        const payload = {};
        payload[`${action}${this.model.graphqlType.name}`] = result;
        return payload;
    }
}
exports.CRUDService = CRUDService;
//# sourceMappingURL=CRUDService.js.map