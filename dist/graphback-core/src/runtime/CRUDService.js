import DataLoader from 'dataloader';
import { withFilter } from 'graphql-subscriptions';
import { GraphbackOperationType, upperCaseFirstChar, getSubscriptionName } from '..';
import { getSelectedFieldsFromResolverInfo, getResolverInfoFieldsList } from '../plugin/getSelectedFieldsFromResolverInfo';
import { createInMemoryFilterPredicate } from './createInMemoryFilterPredicate';
/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class CRUDService {
    db;
    model;
    pubSub;
    crudOptions;
    constructor(model, db, config) {
        this.model = model;
        this.crudOptions = config.crudOptions;
        this.db = db;
        this.pubSub = config.pubSub;
    }
    async create(data, context, info) {
        let selectedFields;
        if ((info != null) && !this.crudOptions.subCreate) {
            selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        }
        const result = await this.db.create(data, selectedFields);
        if (this.pubSub && this.crudOptions.subCreate) {
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.model.graphqlType.name);
            // TODO use subscription name mapping
            const payload = this.buildEventPayload('new', result);
            this.pubSub.publish(topic, payload).catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
            });
        }
        return result;
    }
    async update(data, context, info) {
        const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        const result = await this.db.update(data, selectedFields);
        if (this.pubSub && this.crudOptions.subUpdate) {
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.model.graphqlType.name);
            // TODO use subscription name mapping
            const payload = this.buildEventPayload('updated', result);
            this.pubSub.publish(topic, payload).catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
            });
        }
        return result;
    }
    async updateBy(args, context, info) {
        const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        const result = await this.db.updateBy(args, selectedFields);
        return {
            items: result
        };
    }
    async delete(data, context, info) {
        // if (info && !this.crudOptions.subDelete) { SHOULD ALWAYS LOOK FOR PROJECTION
        const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        // }
        const result = await this.db.delete(data, selectedFields);
        if (this.pubSub && this.crudOptions.subDelete) {
            const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.model.graphqlType.name);
            const payload = this.buildEventPayload('deleted', result);
            this.pubSub.publish(topic, payload).catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`);
            });
        }
        return result;
    }
    async deleteBy(args, context, info) {
        const selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        const result = await this.db.deleteBy(args, selectedFields);
        return {
            items: result
        };
    }
    async findOne(args, context, info) {
        let selectedFields;
        if (info != null) {
            selectedFields = getSelectedFieldsFromResolverInfo(info, this.model);
        }
        return await this.db.findOne(args, selectedFields);
    }
    async findBy(args, context, info, path) {
        let selectedFields;
        let requestedCount = false;
        if (info != null) {
            selectedFields = getSelectedFieldsFromResolverInfo(info, this.model, path);
            requestedCount = path === 'items' && getResolverInfoFieldsList(info).some((field) => field === 'count');
        }
        const items = await this.db.findBy(args, selectedFields);
        // set page values for returned object
        const resultPageInfo = {
            offset: 0,
            ...args?.page
        };
        let count;
        if (requestedCount) {
            count = await this.db.count(args.filter);
        }
        return {
            items,
            count,
            offset: 0,
            ...resultPageInfo
        };
    }
    subscribeToCreate(filter) {
        if (!this.pubSub) {
            throw Error('Missing PubSub implementation in CRUDService');
        }
        const operationType = GraphbackOperationType.CREATE;
        const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(createSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate(filter);
        return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    subscribeToUpdate(filter) {
        if (!this.pubSub) {
            throw Error('Missing PubSub implementation in CRUDService');
        }
        const operationType = GraphbackOperationType.UPDATE;
        const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(updateSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate(filter);
        return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    subscribeToDelete(filter) {
        if (!this.pubSub) {
            throw Error('Missing PubSub implementation in CRUDService');
        }
        const operationType = GraphbackOperationType.DELETE;
        const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name);
        const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType);
        const asyncIterator = this.pubSub.asyncIterator(deleteSubKey);
        const subscriptionFilter = createInMemoryFilterPredicate(filter);
        return withFilter(() => asyncIterator, (payload) => subscriptionFilter(payload[subscriptionName]))();
    }
    batchLoadData(relationField, id, filter, context, info) {
        const selectedFields = [];
        if (info != null) {
            const selectedFieldsFromInfo = getSelectedFieldsFromResolverInfo(info, this.model);
            selectedFields.push(...selectedFieldsFromInfo);
            // only push the relation field if there are fields selected
            // because all fields will be selected otherwise
            if (selectedFields.length > 0) {
                selectedFields.push(relationField);
            }
        }
        const fetchedKeys = selectedFields.join('-');
        const keyName = `${this.model.graphqlType.name}-${upperCaseFirstChar(relationField)}-${fetchedKeys}-${JSON.stringify(filter)}-DataLoader`;
        if (!context[keyName]) {
            context[keyName] = new DataLoader(async (keys) => {
                return await this.db.batchRead(relationField, keys, filter, selectedFields);
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
//# sourceMappingURL=CRUDService.js.map