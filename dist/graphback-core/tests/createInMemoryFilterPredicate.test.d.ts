import { Maybe, StringInput, IdInput, BooleanInput, IntInput, FloatInput, GraphbackDateTimeInput, GraphbackObjectIdInput } from '../src/runtime/QueryFilter';
export declare type UserSubscriptionFilter = {
    id?: Maybe<IdInput>;
    name?: Maybe<StringInput>;
    verified?: Maybe<BooleanInput>;
    age?: Maybe<IntInput>;
    score?: Maybe<FloatInput>;
    createdAt?: Maybe<GraphbackDateTimeInput>;
    objectId?: Maybe<GraphbackObjectIdInput>;
    and?: Maybe<UserSubscriptionFilter[]>;
    or?: Maybe<UserSubscriptionFilter[]>;
    not?: Maybe<UserSubscriptionFilter>;
};
//# sourceMappingURL=createInMemoryFilterPredicate.test.d.ts.map