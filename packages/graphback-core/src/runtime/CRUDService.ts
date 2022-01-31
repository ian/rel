import { PubSubEngine, withFilter } from 'graphql-subscriptions'
import { GraphQLResolveInfo } from 'graphql'
import { GraphbackOperationType, getSubscriptionName } from '..'
import { ModelDefinition } from '../plugin/ModelDefinition'
import { getSelectedFieldsFromResolverInfo, getResolverInfoFieldsList } from '../plugin/getSelectedFieldsFromResolverInfo'
import { createInMemoryFilterPredicate } from './createInMemoryFilterPredicate'
import { FindByArgs } from './interfaces'
import { QueryFilter } from './QueryFilter'
import { GraphbackCRUDService, GraphbackDataProvider, GraphbackContext, ResultList } from '.'

/**
 * Configurations necessary to create a CRUDService
 */
export interface CRUDServiceConfig {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine
}
/**
 * Default implementation of the CRUD service offering following capabilities:
 *
 * - Subscriptions: using default publish subscribe method
 * - Logging: using logging abstraction
 */
// tslint:disable-next-line: no-any
export class CRUDService<Type = any> implements GraphbackCRUDService<Type> {
  protected db: GraphbackDataProvider
  protected model: ModelDefinition
  protected pubSub: PubSubEngine

  public constructor(model: ModelDefinition, db: GraphbackDataProvider, config: CRUDServiceConfig, models: ModelDefinition[]) {
    this.model = model
    this.db = db
    this.db.setGlobalModelDefinition(models)
    this.pubSub = config.pubSub
  }

  public async initializeUniqueIndex() {
    return await this.db.initializeUniqueIndex()
  }

  public async create(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true)

    const result = await this.db.create(data, selectedFields)

    if (this.pubSub) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.CREATE, this.model.graphqlType.name)
      // TODO use subscription name mapping
      const payload = this.buildEventPayload('new', result)
      this.pubSub.publish(topic, payload).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Publishing of new "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`)
      })
    }

    return result
  }

  public async update(data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true)

    const result = await this.db.update(data, selectedFields)

    if (this.pubSub) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.UPDATE, this.model.graphqlType.name)
      // TODO use subscription name mapping
      const payload = this.buildEventPayload('updated', result)

      this.pubSub.publish(topic, payload).catch((error: Error) => {
        console.error(`Publishing of updates of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`)
      })
    }

    return result
  }

  public async updateBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.mode, true)
    const result = await this.db.updateBy(args, selectedFields)

    return {
      items: result
    }
  }

  public async delete(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true)
    const result = await this.db.delete(data, selectedFields)

    if (this.pubSub) {
      const topic = this.subscriptionTopicMapping(GraphbackOperationType.DELETE, this.model.graphqlType.name)
      const payload = this.buildEventPayload('deleted', result)

      this.pubSub.publish(topic, payload).catch((error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Publishing of deletion of "${this.model.graphqlType.name}" with id ${result[this.model.primaryKey.name]} failed: ${error.message}`)
      })
    }

    return result
  }

  public async deleteBy(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model, true)
    const result = await this.db.deleteBy(args, selectedFields)

    return {
      items: result
    }
  }

  public async findOne(args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    const [selectedFields, _] = getSelectedFieldsFromResolverInfo(info, this.model)
    return await this.db.findOne(args, selectedFields)
  }

  public async findBy(args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>> {
    let requestedCount = false
    const [selectedFields, fieldArgs] = getSelectedFieldsFromResolverInfo(info, this.model, false, path)
    requestedCount = path === 'items' && getResolverInfoFieldsList(info).some((field: string) => field === 'count')
    const items: Type[] = await this.db.findBy(args, selectedFields, fieldArgs)

    // set page values for returned object
    const resultPageInfo = {
      offset: 0,
      ...args?.page
    }

    let count: number
    if (requestedCount) {
      count = await this.db.count(args.filter)
    }

    return {
      items,
      count,
      offset: 0,
      ...resultPageInfo
    }
  }

  public subscribeToCreate(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error('Missing PubSub implementation in CRUDService')
    }

    const operationType = GraphbackOperationType.CREATE
    const createSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name)
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(createSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  public subscribeToUpdate(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error('Missing PubSub implementation in CRUDService')
    }

    const operationType = GraphbackOperationType.UPDATE
    const updateSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name)
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(updateSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  public subscribeToDelete(filter?: QueryFilter): AsyncIterator<Type> | undefined {
    if (!this.pubSub) {
      throw Error('Missing PubSub implementation in CRUDService')
    }

    const operationType = GraphbackOperationType.DELETE
    const deleteSubKey = this.subscriptionTopicMapping(operationType, this.model.graphqlType.name)
    const subscriptionName = getSubscriptionName(this.model.graphqlType.name, operationType)

    const asyncIterator = this.pubSub.asyncIterator<Type>(deleteSubKey)

    const subscriptionFilter = createInMemoryFilterPredicate<Type>(filter)

    return withFilter(() => asyncIterator, (payload: any) => subscriptionFilter(payload[subscriptionName]))()
  }

  /**
   * Provides way to map runtime topics for subscriptions for specific types and object names
   */
  protected subscriptionTopicMapping(triggerType: GraphbackOperationType, objectName: string) {
    return `${triggerType}_${objectName}`.toUpperCase()
  }

  private buildEventPayload(action: string, result: any) {
    const payload = {}
    payload[`${action}${this.model.graphqlType.name}`] = result

    return payload
  }
}
