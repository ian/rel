import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Int: number,
    Boolean: boolean,
}

export type EnumPostFields = 'id' | 'body'

export type EnumUserFields = 'id' | 'name' | 'posts'

export interface Mutation {
    createPost?: Post
    updatePost?: Post
    updatePosts?: PostMutationResultList
    deletePost?: Post
    deletePosts?: PostMutationResultList
    createUser?: User
    updateUser?: User
    updateUsers?: UserMutationResultList
    deleteUser?: User
    deleteUsers?: UserMutationResultList
    __typename: 'Mutation'
}


/** @model */
export interface Post {
    id: Scalars['ID']
    body: Scalars['String']
    /** @manyToOne(field: 'posts', key: 'ownerId') */
    owner?: User
    /** @transient */
    count?: Scalars['Int']
    /** @transient */
    avg?: Scalars['Int']
    /** @transient */
    max?: Scalars['Int']
    /** @transient */
    min?: Scalars['Int']
    /** @transient */
    sum?: Scalars['Int']
    __typename: 'Post'
}

export interface PostMutationResultList {
    items: (Post | undefined)[]
    __typename: 'PostMutationResultList'
}

export interface PostResultList {
    items: (Post | undefined)[]
    offset?: Scalars['Int']
    limit?: Scalars['Int']
    count?: Scalars['Int']
    __typename: 'PostResultList'
}

export interface Query {
    getPost?: Post
    findPosts: PostResultList
    getUser?: User
    findUsers: UserResultList
    __typename: 'Query'
}

export type SortDirectionEnum = 'DESC' | 'ASC'

export interface Subscription {
    newPost: Post
    updatedPost: Post
    deletedPost: Post
    newUser: User
    updatedUser: User
    deletedUser: User
    __typename: 'Subscription'
}


/** @model */
export interface User {
    id: Scalars['ID']
    name: Scalars['String']
    /**
     * @oneToMany(field: 'owner', key: 'ownerId')
     * @oneToMany(field: 'owner')
     */
    posts?: (Post | undefined)[]
    /** @transient */
    count?: Scalars['Int']
    /** @transient */
    avg?: Scalars['Int']
    /** @transient */
    max?: Scalars['Int']
    /** @transient */
    min?: Scalars['Int']
    /** @transient */
    sum?: Scalars['Int']
    __typename: 'User'
}

export interface UserMutationResultList {
    items: (User | undefined)[]
    __typename: 'UserMutationResultList'
}

export interface UserResultList {
    items: (User | undefined)[]
    offset?: Scalars['Int']
    limit?: Scalars['Int']
    count?: Scalars['Int']
    __typename: 'UserResultList'
}

export interface CreatePostInput {body: Scalars['String'],ownerId?: (Scalars['ID'] | null)}

export interface CreateUserInput {name: Scalars['String']}

export interface IDInput {ne?: (Scalars['ID'] | null),eq?: (Scalars['ID'] | null),le?: (Scalars['ID'] | null),lt?: (Scalars['ID'] | null),ge?: (Scalars['ID'] | null),gt?: (Scalars['ID'] | null),in?: (Scalars['ID'][] | null)}

export interface MutatePostInput {id: Scalars['ID'],body?: (Scalars['String'] | null),ownerId?: (Scalars['ID'] | null)}

export interface MutateUserInput {id: Scalars['ID'],name?: (Scalars['String'] | null)}

export interface MutationRequest{
    createPost?: [{input: CreatePostInput},PostRequest]
    updatePost?: [{input: MutatePostInput},PostRequest]
    updatePosts?: [{filter?: (PostFilter | null),input: MutatePostInput},PostMutationResultListRequest]
    deletePost?: [{id: Scalars['ID']},PostRequest]
    deletePosts?: [{filter?: (PostFilter | null)},PostMutationResultListRequest] | PostMutationResultListRequest
    createUser?: [{input: CreateUserInput},UserRequest]
    updateUser?: [{input: MutateUserInput},UserRequest]
    updateUsers?: [{filter?: (UserFilter | null),input: MutateUserInput},UserMutationResultListRequest]
    deleteUser?: [{id: Scalars['ID']},UserRequest]
    deleteUsers?: [{filter?: (UserFilter | null)},UserMutationResultListRequest] | UserMutationResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OfPostInput {of?: (EnumPostFields | null)}

export interface OfUserInput {of?: (EnumUserFields | null)}

export interface OrderByInput {field: Scalars['String'],order?: (SortDirectionEnum | null)}

export interface PageRequest {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null)}


/** @model */
export interface PostRequest{
    id?: boolean | number
    body?: boolean | number
    /** @manyToOne(field: 'posts', key: 'ownerId') */
    owner?: UserRequest
    /** @transient */
    count?: [{of?: (OfPostInput | null)}] | boolean | number
    /** @transient */
    avg?: [{of?: (OfPostInput | null)}] | boolean | number
    /** @transient */
    max?: [{of?: (OfPostInput | null)}] | boolean | number
    /** @transient */
    min?: [{of?: (OfPostInput | null)}] | boolean | number
    /** @transient */
    sum?: [{of?: (OfPostInput | null)}] | boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostFilter {id?: (IDInput | null),body?: (StringInput | null),ownerId?: (IDInput | null),and?: (PostFilter[] | null),or?: (PostFilter[] | null),not?: (PostFilter | null)}

export interface PostMutationResultListRequest{
    items?: PostRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostResultListRequest{
    items?: PostRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostSubscriptionFilter {and?: (PostSubscriptionFilter[] | null),or?: (PostSubscriptionFilter[] | null),not?: (PostSubscriptionFilter | null),id?: (IDInput | null),body?: (StringInput | null)}

export interface QueryRequest{
    getPost?: [{id: Scalars['ID']},PostRequest]
    findPosts?: [{filter?: (PostFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)},PostResultListRequest] | PostResultListRequest
    getUser?: [{id: Scalars['ID']},UserRequest]
    findUsers?: [{filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)},UserResultListRequest] | UserResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringInput {ne?: (Scalars['String'] | null),eq?: (Scalars['String'] | null),le?: (Scalars['String'] | null),lt?: (Scalars['String'] | null),ge?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),contains?: (Scalars['String'] | null),startsWith?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null)}

export interface SubscriptionRequest{
    newPost?: [{filter?: (PostSubscriptionFilter | null)},PostRequest] | PostRequest
    updatedPost?: [{filter?: (PostSubscriptionFilter | null)},PostRequest] | PostRequest
    deletedPost?: [{filter?: (PostSubscriptionFilter | null)},PostRequest] | PostRequest
    newUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    updatedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    deletedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** @model */
export interface UserRequest{
    id?: boolean | number
    name?: boolean | number
    /**
     * @oneToMany(field: 'owner', key: 'ownerId')
     * @oneToMany(field: 'owner')
     */
    posts?: [{filter?: (PostFilter | null)},PostRequest] | PostRequest
    /** @transient */
    count?: [{of?: (OfUserInput | null)}] | boolean | number
    /** @transient */
    avg?: [{of?: (OfUserInput | null)}] | boolean | number
    /** @transient */
    max?: [{of?: (OfUserInput | null)}] | boolean | number
    /** @transient */
    min?: [{of?: (OfUserInput | null)}] | boolean | number
    /** @transient */
    sum?: [{of?: (OfUserInput | null)}] | boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserFilter {id?: (IDInput | null),name?: (StringInput | null),and?: (UserFilter[] | null),or?: (UserFilter[] | null),not?: (UserFilter | null)}

export interface UserMutationResultListRequest{
    items?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserResultListRequest{
    items?: UserRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSubscriptionFilter {and?: (UserSubscriptionFilter[] | null),or?: (UserSubscriptionFilter[] | null),not?: (UserSubscriptionFilter | null),id?: (IDInput | null),name?: (StringInput | null)}


const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Post_possibleTypes = ['Post']
export const isPost = (obj?: { __typename?: any } | null): obj is Post => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPost"')
  return Post_possibleTypes.includes(obj.__typename)
}



const PostMutationResultList_possibleTypes = ['PostMutationResultList']
export const isPostMutationResultList = (obj?: { __typename?: any } | null): obj is PostMutationResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostMutationResultList"')
  return PostMutationResultList_possibleTypes.includes(obj.__typename)
}



const PostResultList_possibleTypes = ['PostResultList']
export const isPostResultList = (obj?: { __typename?: any } | null): obj is PostResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPostResultList"')
  return PostResultList_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj?: { __typename?: any } | null): obj is Subscription => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubscription"')
  return Subscription_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



const UserMutationResultList_possibleTypes = ['UserMutationResultList']
export const isUserMutationResultList = (obj?: { __typename?: any } | null): obj is UserMutationResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserMutationResultList"')
  return UserMutationResultList_possibleTypes.includes(obj.__typename)
}



const UserResultList_possibleTypes = ['UserResultList']
export const isUserResultList = (obj?: { __typename?: any } | null): obj is UserResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserResultList"')
  return UserResultList_possibleTypes.includes(obj.__typename)
}


export interface MutationPromiseChain{
    createPost: ((args: {input: CreatePostInput}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Promise<(FieldsSelection<Post, R> | undefined)>}),
    updatePost: ((args: {input: MutatePostInput}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Promise<(FieldsSelection<Post, R> | undefined)>}),
    updatePosts: ((args: {filter?: (PostFilter | null),input: MutatePostInput}) => PostMutationResultListPromiseChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Promise<(FieldsSelection<PostMutationResultList, R> | undefined)>}),
    deletePost: ((args: {id: Scalars['ID']}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Promise<(FieldsSelection<Post, R> | undefined)>}),
    deletePosts: ((args?: {filter?: (PostFilter | null)}) => PostMutationResultListPromiseChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Promise<(FieldsSelection<PostMutationResultList, R> | undefined)>})&(PostMutationResultListPromiseChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Promise<(FieldsSelection<PostMutationResultList, R> | undefined)>}),
    createUser: ((args: {input: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}

export interface MutationObservableChain{
    createPost: ((args: {input: CreatePostInput}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Observable<(FieldsSelection<Post, R> | undefined)>}),
    updatePost: ((args: {input: MutatePostInput}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Observable<(FieldsSelection<Post, R> | undefined)>}),
    updatePosts: ((args: {filter?: (PostFilter | null),input: MutatePostInput}) => PostMutationResultListObservableChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Observable<(FieldsSelection<PostMutationResultList, R> | undefined)>}),
    deletePost: ((args: {id: Scalars['ID']}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Observable<(FieldsSelection<Post, R> | undefined)>}),
    deletePosts: ((args?: {filter?: (PostFilter | null)}) => PostMutationResultListObservableChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Observable<(FieldsSelection<PostMutationResultList, R> | undefined)>})&(PostMutationResultListObservableChain & {get: <R extends PostMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<PostMutationResultList, R> | undefined)) => Observable<(FieldsSelection<PostMutationResultList, R> | undefined)>}),
    createUser: ((args: {input: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}


/** @model */
export interface PostPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    body: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** @manyToOne(field: 'posts', key: 'ownerId') */
owner: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    
/** @transient */
count: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
avg: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
max: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
min: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
sum: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}


/** @model */
export interface PostObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    body: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** @manyToOne(field: 'posts', key: 'ownerId') */
owner: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    
/** @transient */
count: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
avg: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
max: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
min: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
sum: ((args?: {of?: (OfPostInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface PostMutationResultListPromiseChain{
    items: ({get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)[]) => Promise<(FieldsSelection<Post, R> | undefined)[]>})
}

export interface PostMutationResultListObservableChain{
    items: ({get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)[]) => Observable<(FieldsSelection<Post, R> | undefined)[]>})
}

export interface PostResultListPromiseChain{
    items: ({get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)[]) => Promise<(FieldsSelection<Post, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface PostResultListObservableChain{
    items: ({get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)[]) => Observable<(FieldsSelection<Post, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface QueryPromiseChain{
    getPost: ((args: {id: Scalars['ID']}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Promise<(FieldsSelection<Post, R> | undefined)>}),
    findPosts: ((args?: {filter?: (PostFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => PostResultListPromiseChain & {get: <R extends PostResultListRequest>(request: R, defaultValue?: FieldsSelection<PostResultList, R>) => Promise<FieldsSelection<PostResultList, R>>})&(PostResultListPromiseChain & {get: <R extends PostResultListRequest>(request: R, defaultValue?: FieldsSelection<PostResultList, R>) => Promise<FieldsSelection<PostResultList, R>>}),
    getUser: ((args: {id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})&(UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})
}

export interface QueryObservableChain{
    getPost: ((args: {id: Scalars['ID']}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: (FieldsSelection<Post, R> | undefined)) => Observable<(FieldsSelection<Post, R> | undefined)>}),
    findPosts: ((args?: {filter?: (PostFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => PostResultListObservableChain & {get: <R extends PostResultListRequest>(request: R, defaultValue?: FieldsSelection<PostResultList, R>) => Observable<FieldsSelection<PostResultList, R>>})&(PostResultListObservableChain & {get: <R extends PostResultListRequest>(request: R, defaultValue?: FieldsSelection<PostResultList, R>) => Observable<FieldsSelection<PostResultList, R>>}),
    getUser: ((args: {id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})&(UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})
}

export interface SubscriptionPromiseChain{
    newPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>})&(PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    updatedPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>})&(PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    deletedPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>})&(PostPromiseChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Promise<FieldsSelection<Post, R>>}),
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface SubscriptionObservableChain{
    newPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>})&(PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    updatedPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>})&(PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    deletedPost: ((args?: {filter?: (PostSubscriptionFilter | null)}) => PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>})&(PostObservableChain & {get: <R extends PostRequest>(request: R, defaultValue?: FieldsSelection<Post, R>) => Observable<FieldsSelection<Post, R>>}),
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}


/** @model */
export interface UserPromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/**
 * @oneToMany(field: 'owner', key: 'ownerId')
 * @oneToMany(field: 'owner')
 */
posts: ((args?: {filter?: (PostFilter | null)}) => {get: <R extends PostRequest>(request: R, defaultValue?: ((FieldsSelection<Post, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Post, R> | undefined)[] | undefined)>})&({get: <R extends PostRequest>(request: R, defaultValue?: ((FieldsSelection<Post, R> | undefined)[] | undefined)) => Promise<((FieldsSelection<Post, R> | undefined)[] | undefined)>}),
    
/** @transient */
count: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
avg: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
max: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
min: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @transient */
sum: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}


/** @model */
export interface UserObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/**
 * @oneToMany(field: 'owner', key: 'ownerId')
 * @oneToMany(field: 'owner')
 */
posts: ((args?: {filter?: (PostFilter | null)}) => {get: <R extends PostRequest>(request: R, defaultValue?: ((FieldsSelection<Post, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Post, R> | undefined)[] | undefined)>})&({get: <R extends PostRequest>(request: R, defaultValue?: ((FieldsSelection<Post, R> | undefined)[] | undefined)) => Observable<((FieldsSelection<Post, R> | undefined)[] | undefined)>}),
    
/** @transient */
count: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
avg: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
max: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
min: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @transient */
sum: ((args?: {of?: (OfUserInput | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface UserMutationResultListPromiseChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Promise<(FieldsSelection<User, R> | undefined)[]>})
}

export interface UserMutationResultListObservableChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Observable<(FieldsSelection<User, R> | undefined)[]>})
}

export interface UserResultListPromiseChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Promise<(FieldsSelection<User, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface UserResultListObservableChain{
    items: ({get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)[]) => Observable<(FieldsSelection<User, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}