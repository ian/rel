import {
  FieldsSelection,
  GraphqlOperation,
  ClientOptions,
  Observable,
} from '@genql/runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'
export * from './schema'
import {
  QueryRequest,
  QueryPromiseChain,
  Query,
  MutationRequest,
  MutationPromiseChain,
  Mutation,
  SubscriptionRequest,
  SubscriptionObservableChain,
  Subscription,
} from './schema'
export declare const createClient: (options?: ClientOptions) => Client
export declare const everything: { __scalar: boolean }
export declare const version: string

export interface Client {
  wsClient?: SubscriptionClient

  query<R extends QueryRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Query, R>>

  mutation<R extends MutationRequest>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<Mutation, R>>

  subscription<R extends SubscriptionRequest>(
    request: R & { __name?: string },
  ): Observable<FieldsSelection<Subscription, R>>

  chain: {
    query: QueryPromiseChain

    mutation: MutationPromiseChain

    subscription: SubscriptionObservableChain
  }
}

export type QueryResult<fields extends QueryRequest> = FieldsSelection<
  Query,
  fields
>

export declare const generateQueryOp: (
  fields: QueryRequest & { __name?: string },
) => GraphqlOperation
export type MutationResult<fields extends MutationRequest> = FieldsSelection<
  Mutation,
  fields
>

export declare const generateMutationOp: (
  fields: MutationRequest & { __name?: string },
) => GraphqlOperation
export type SubscriptionResult<
  fields extends SubscriptionRequest
> = FieldsSelection<Subscription, fields>

export declare const generateSubscriptionOp: (
  fields: SubscriptionRequest & { __name?: string },
) => GraphqlOperation

export declare const enumEnumPostFields: {
  readonly id: 'id'
  readonly body: 'body'
}

export declare const enumEnumUserFields: {
  readonly id: 'id'
  readonly name: 'name'
  readonly posts: 'posts'
}

export declare const enumSortDirectionEnum: {
  readonly DESC: 'DESC'
  readonly ASC: 'ASC'
}
