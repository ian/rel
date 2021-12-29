import { GraphQLResolveInfo } from 'graphql'
import { GraphbackCRUDService, ResultList } from './GraphbackCRUDService'
import { QueryFilter } from './QueryFilter'
import { GraphbackContext, FindByArgs } from './interfaces'

/**
 * ProxyService that can be used by any services that wish to extend
 * Graphback functionality.
 * Service works by proxying method requests to another service or
 * datastore.
 */
export class GraphbackProxyService<Type = any> implements GraphbackCRUDService<Type> {
  protected proxiedService: GraphbackCRUDService

  public constructor (service: GraphbackCRUDService) {
    this.proxiedService = service
  }

  public async create (data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    return await this.proxiedService.create(data, context, info)
  }

  public async update (data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    return await this.proxiedService.update(data, context, info)
  }

  public async delete (data: Type, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    return await this.proxiedService.delete(data, context, info)
  }

  public async findOne (args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<Type> {
    return await this.proxiedService.findOne(args, context, info)
  }

  public async findBy (args?: FindByArgs, context?: GraphbackContext, info?: GraphQLResolveInfo, path?: string): Promise<ResultList<Type>> {
    return await this.proxiedService.findBy(args, context, info, path)
  }

  public async updateBy (args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>> {
    return await this.proxiedService.updateBy(args, context, info)
  }

  public async deleteBy (args: Partial<Type>, context?: GraphbackContext, info?: GraphQLResolveInfo): Promise<ResultList<Type>> {
    return await this.proxiedService.deleteBy(args, context, info)
  }

  public subscribeToCreate (filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> {
    return this.proxiedService.subscribeToCreate(filter, context)
  }

  public subscribeToUpdate (filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> {
    return this.proxiedService.subscribeToUpdate(filter, context)
  }

  public subscribeToDelete (filter?: QueryFilter, context?: GraphbackContext): AsyncIterator<Type> {
    return this.proxiedService.subscribeToDelete(filter, context)
  }

  public batchLoadData (relationField: string, id: string | number, filter: QueryFilter, context: GraphbackContext, info?: GraphQLResolveInfo) {
    return this.proxiedService.batchLoadData(relationField, id, filter, context, info)
  }
}
