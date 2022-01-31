import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    Boolean: boolean,
    String: string,
    ID: string,
    Int: number,
    Timestamp: any,
    Float: number,
}

export interface Mutation {
    createNote?: Note
    updateNote?: Note
    updateNotes?: NoteMutationResultList
    deleteNote?: Note
    deleteNotes?: NoteMutationResultList
    createUser?: User
    updateUser?: User
    updateUsers?: UserMutationResultList
    deleteUser?: User
    deleteUsers?: UserMutationResultList
    __typename: 'Mutation'
}

export interface Note {
    body: Scalars['String']
    archived?: Scalars['Boolean']
    _id?: Scalars['ID']
    count?: Scalars['Int']
    createdAt?: Scalars['Timestamp']
    updatedAt?: Scalars['Timestamp']
    __typename: 'Note'
}

export type NoteFieldsEnum = '_id' | 'body' | 'archived' | 'createdAt' | 'updatedAt'

export interface NoteMutationResultList {
    items: (Note | undefined)[]
    __typename: 'NoteMutationResultList'
}

export interface NoteResultList {
    items: (Note | undefined)[]
    offset?: Scalars['Int']
    limit?: Scalars['Int']
    count?: Scalars['Int']
    __typename: 'NoteResultList'
}

export interface Query {
    getNote?: Note
    findNotes: NoteResultList
    getUser?: User
    findUsers: UserResultList
    __typename: 'Query'
}

export type RelDirection = 'IN' | 'OUT'

export type SortDirectionEnum = 'DESC' | 'ASC'

export interface Subscription {
    newNote: Note
    updatedNote: Note
    deletedNote: Note
    newUser: User
    updatedUser: User
    deletedUser: User
    __typename: 'Subscription'
}

export interface User {
    name: Scalars['String']
    email?: Scalars['String']
    _id?: Scalars['ID']
    count?: Scalars['Int']
    createdAt?: Scalars['Timestamp']
    updatedAt?: Scalars['Timestamp']
    __typename: 'User'
}

export type UserFieldsEnum = '_id' | 'name' | 'email' | 'createdAt' | 'updatedAt'

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

export interface BooleanInput {ne?: (Scalars['Boolean'] | null),eq?: (Scalars['Boolean'] | null)}

export interface CreateNoteInput {body: Scalars['String'],archived?: (Scalars['Boolean'] | null)}

export interface CreateUserInput {name: Scalars['String'],email?: (Scalars['String'] | null)}

export interface IDInput {ne?: (Scalars['ID'] | null),eq?: (Scalars['ID'] | null),le?: (Scalars['ID'] | null),lt?: (Scalars['ID'] | null),ge?: (Scalars['ID'] | null),gt?: (Scalars['ID'] | null),in?: (Scalars['ID'][] | null)}

export interface IntInput {ne?: (Scalars['Int'] | null),eq?: (Scalars['Int'] | null),le?: (Scalars['Int'] | null),lt?: (Scalars['Int'] | null),ge?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),between?: (Scalars['Int'][] | null)}

export interface MutateNoteInput {body?: (Scalars['String'] | null),archived?: (Scalars['Boolean'] | null),_id?: (Scalars['ID'] | null)}

export interface MutateUserInput {name?: (Scalars['String'] | null),email?: (Scalars['String'] | null),_id?: (Scalars['ID'] | null)}

export interface MutationRequest{
    createNote?: [{input: CreateNoteInput},NoteRequest]
    updateNote?: [{input: MutateNoteInput},NoteRequest]
    updateNotes?: [{filter?: (NoteFilter | null),input: MutateNoteInput},NoteMutationResultListRequest]
    deleteNote?: [{_id: Scalars['ID']},NoteRequest]
    deleteNotes?: [{filter?: (NoteFilter | null)},NoteMutationResultListRequest] | NoteMutationResultListRequest
    createUser?: [{input: CreateUserInput},UserRequest]
    updateUser?: [{input: MutateUserInput},UserRequest]
    updateUsers?: [{filter?: (UserFilter | null),input: MutateUserInput},UserMutationResultListRequest]
    deleteUser?: [{_id: Scalars['ID']},UserRequest]
    deleteUsers?: [{filter?: (UserFilter | null)},UserMutationResultListRequest] | UserMutationResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteRequest{
    body?: boolean | number
    archived?: boolean | number
    _id?: boolean | number
    count?: [{of?: (OfNoteInput | null),distinct?: (Scalars['Boolean'] | null)}] | boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteFilter {body?: (StringInput | null),archived?: (BooleanInput | null),_id?: (IDInput | null),and?: (NoteFilter[] | null),or?: (NoteFilter[] | null),not?: (NoteFilter | null),createdAt?: (TimestampInput | null),updatedAt?: (TimestampInput | null)}

export interface NoteMutationResultListRequest{
    items?: NoteRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteOrderByInput {field?: (NoteFieldsEnum | null),order?: (SortDirectionEnum | null)}

export interface NoteResultListRequest{
    items?: NoteRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteSubscriptionFilter {and?: (NoteSubscriptionFilter[] | null),or?: (NoteSubscriptionFilter[] | null),not?: (NoteSubscriptionFilter | null),body?: (StringInput | null),archived?: (BooleanInput | null),_id?: (IDInput | null),count?: (IntInput | null)}

export interface OfNoteInput {of?: (NoteFieldsEnum | null)}

export interface OfUserInput {of?: (UserFieldsEnum | null)}

export interface PageRequest {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null)}

export interface QueryRequest{
    getNote?: [{_id: Scalars['ID']},NoteRequest]
    findNotes?: [{filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: ((NoteOrderByInput | null)[] | null)},NoteResultListRequest] | NoteResultListRequest
    getUser?: [{_id: Scalars['ID']},UserRequest]
    findUsers?: [{filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)},UserResultListRequest] | UserResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringInput {ne?: (Scalars['String'] | null),eq?: (Scalars['String'] | null),le?: (Scalars['String'] | null),lt?: (Scalars['String'] | null),ge?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),contains?: (Scalars['String'] | null),startsWith?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null)}

export interface SubscriptionRequest{
    newNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    updatedNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    deletedNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    newUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    updatedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    deletedUser?: [{filter?: (UserSubscriptionFilter | null)},UserRequest] | UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TimestampInput {ne?: (Scalars['Timestamp'] | null),eq?: (Scalars['Timestamp'] | null),le?: (Scalars['Timestamp'] | null),lt?: (Scalars['Timestamp'] | null),ge?: (Scalars['Timestamp'] | null),gt?: (Scalars['Timestamp'] | null),in?: (Scalars['Timestamp'][] | null),between?: (Scalars['Timestamp'][] | null)}

export interface UserRequest{
    name?: boolean | number
    email?: boolean | number
    _id?: boolean | number
    count?: [{of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}] | boolean | number
    createdAt?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserFilter {name?: (StringInput | null),email?: (StringInput | null),_id?: (IDInput | null),and?: (UserFilter[] | null),or?: (UserFilter[] | null),not?: (UserFilter | null),createdAt?: (TimestampInput | null),updatedAt?: (TimestampInput | null)}

export interface UserMutationResultListRequest{
    items?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOrderByInput {field?: (UserFieldsEnum | null),order?: (SortDirectionEnum | null)}

export interface UserResultListRequest{
    items?: UserRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserSubscriptionFilter {and?: (UserSubscriptionFilter[] | null),or?: (UserSubscriptionFilter[] | null),not?: (UserSubscriptionFilter | null),name?: (StringInput | null),email?: (StringInput | null),_id?: (IDInput | null),count?: (IntInput | null)}


const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Note_possibleTypes = ['Note']
export const isNote = (obj?: { __typename?: any } | null): obj is Note => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isNote"')
  return Note_possibleTypes.includes(obj.__typename)
}



const NoteMutationResultList_possibleTypes = ['NoteMutationResultList']
export const isNoteMutationResultList = (obj?: { __typename?: any } | null): obj is NoteMutationResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isNoteMutationResultList"')
  return NoteMutationResultList_possibleTypes.includes(obj.__typename)
}



const NoteResultList_possibleTypes = ['NoteResultList']
export const isNoteResultList = (obj?: { __typename?: any } | null): obj is NoteResultList => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isNoteResultList"')
  return NoteResultList_possibleTypes.includes(obj.__typename)
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
    createNote: ((args: {input: CreateNoteInput}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    updateNote: ((args: {input: MutateNoteInput}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    updateNotes: ((args: {filter?: (NoteFilter | null),input: MutateNoteInput}) => NoteMutationResultListPromiseChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Promise<(FieldsSelection<NoteMutationResultList, R> | undefined)>}),
    deleteNote: ((args: {_id: Scalars['ID']}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    deleteNotes: ((args?: {filter?: (NoteFilter | null)}) => NoteMutationResultListPromiseChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Promise<(FieldsSelection<NoteMutationResultList, R> | undefined)>})&(NoteMutationResultListPromiseChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Promise<(FieldsSelection<NoteMutationResultList, R> | undefined)>}),
    createUser: ((args: {input: CreateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {_id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListPromiseChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Promise<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}

export interface MutationObservableChain{
    createNote: ((args: {input: CreateNoteInput}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    updateNote: ((args: {input: MutateNoteInput}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    updateNotes: ((args: {filter?: (NoteFilter | null),input: MutateNoteInput}) => NoteMutationResultListObservableChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Observable<(FieldsSelection<NoteMutationResultList, R> | undefined)>}),
    deleteNote: ((args: {_id: Scalars['ID']}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    deleteNotes: ((args?: {filter?: (NoteFilter | null)}) => NoteMutationResultListObservableChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Observable<(FieldsSelection<NoteMutationResultList, R> | undefined)>})&(NoteMutationResultListObservableChain & {get: <R extends NoteMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<NoteMutationResultList, R> | undefined)) => Observable<(FieldsSelection<NoteMutationResultList, R> | undefined)>}),
    createUser: ((args: {input: CreateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUser: ((args: {input: MutateUserInput}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    updateUsers: ((args: {filter?: (UserFilter | null),input: MutateUserInput}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>}),
    deleteUser: ((args: {_id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    deleteUsers: ((args?: {filter?: (UserFilter | null)}) => UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})&(UserMutationResultListObservableChain & {get: <R extends UserMutationResultListRequest>(request: R, defaultValue?: (FieldsSelection<UserMutationResultList, R> | undefined)) => Observable<(FieldsSelection<UserMutationResultList, R> | undefined)>})
}

export interface NotePromiseChain{
    body: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    archived: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfNoteInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>})
}

export interface NoteObservableChain{
    body: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    archived: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfNoteInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>})
}

export interface NoteMutationResultListPromiseChain{
    items: ({get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)[]) => Promise<(FieldsSelection<Note, R> | undefined)[]>})
}

export interface NoteMutationResultListObservableChain{
    items: ({get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)[]) => Observable<(FieldsSelection<Note, R> | undefined)[]>})
}

export interface NoteResultListPromiseChain{
    items: ({get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)[]) => Promise<(FieldsSelection<Note, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface NoteResultListObservableChain{
    items: ({get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)[]) => Observable<(FieldsSelection<Note, R> | undefined)[]>}),
    offset: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    limit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    count: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface QueryPromiseChain{
    getNote: ((args: {_id: Scalars['ID']}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    findNotes: ((args?: {filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: ((NoteOrderByInput | null)[] | null)}) => NoteResultListPromiseChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Promise<FieldsSelection<NoteResultList, R>>})&(NoteResultListPromiseChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Promise<FieldsSelection<NoteResultList, R>>}),
    getUser: ((args: {_id: Scalars['ID']}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)}) => UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})&(UserResultListPromiseChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Promise<FieldsSelection<UserResultList, R>>})
}

export interface QueryObservableChain{
    getNote: ((args: {_id: Scalars['ID']}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    findNotes: ((args?: {filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: ((NoteOrderByInput | null)[] | null)}) => NoteResultListObservableChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Observable<FieldsSelection<NoteResultList, R>>})&(NoteResultListObservableChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Observable<FieldsSelection<NoteResultList, R>>}),
    getUser: ((args: {_id: Scalars['ID']}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    findUsers: ((args?: {filter?: (UserFilter | null),page?: (PageRequest | null),orderBy?: ((UserOrderByInput | null)[] | null)}) => UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})&(UserResultListObservableChain & {get: <R extends UserResultListRequest>(request: R, defaultValue?: FieldsSelection<UserResultList, R>) => Observable<FieldsSelection<UserResultList, R>>})
}

export interface SubscriptionPromiseChain{
    newNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>}),
    updatedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>}),
    deletedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>}),
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface SubscriptionObservableChain{
    newNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>}),
    updatedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>}),
    deletedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>}),
    newUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updatedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    deletedUser: ((args?: {filter?: (UserSubscriptionFilter | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface UserPromiseChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Promise<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Promise<(Scalars['Timestamp'] | undefined)>})
}

export interface UserObservableChain{
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    email: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    _id: ({get: (request?: boolean|number, defaultValue?: (Scalars['ID'] | undefined)) => Observable<(Scalars['ID'] | undefined)>}),
    count: ((args?: {of?: (OfUserInput | null),distinct?: (Scalars['Boolean'] | null)}) => {get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})&({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['Timestamp'] | undefined)) => Observable<(Scalars['Timestamp'] | undefined)>})
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