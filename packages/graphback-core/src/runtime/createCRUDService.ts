import { PubSubEngine, PubSub } from 'graphql-subscriptions'
import { ModelDefinition } from '..'
import { CRUDServiceConfig, CRUDService } from './CRUDService'
import { GraphbackDataProvider, GraphbackCRUDService, ServiceCreator } from '.'

export interface CreateCRUDServiceOptions {
  /**
   * PubSub implementation for creating subscriptions
   */
  pubSub?: PubSubEngine
}

export function createCRUDService(config?: CreateCRUDServiceOptions): ServiceCreator {
  return async (model: ModelDefinition, dataProvider: GraphbackDataProvider, models: ModelDefinition[]): GraphbackCRUDService => {
    const serviceConfig: CRUDServiceConfig = {
      pubSub: new PubSub(),
      ...config,
    }

    const crudService = new CRUDService(model, dataProvider, serviceConfig, models)

    await crudService.initializeUniqueIndex()

    return crudService
  }
}