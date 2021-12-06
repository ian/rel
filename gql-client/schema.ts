import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    Boolean: boolean,
    String: string,
    ID: string,
    Int: number,
}

export interface Mutation {
    createNote?: Note
    updateNote?: Note
    deleteNote?: Note
    __typename: 'Mutation'
}


/** @model */
export interface Note {
    id: Scalars['ID']
    text: Scalars['String']
    archived: Scalars['Boolean']
    __typename: 'Note'
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
    __typename: 'Query'
}

export type SortDirectionEnum = 'DESC' | 'ASC'

export interface Subscription {
    newNote: Note
    updatedNote: Note
    deletedNote: Note
    __typename: 'Subscription'
}

export interface BooleanInput {ne?: (Scalars['Boolean'] | null),eq?: (Scalars['Boolean'] | null)}

export interface CreateNoteInput {text: Scalars['String'],archived: Scalars['Boolean']}

export interface IDInput {ne?: (Scalars['ID'] | null),eq?: (Scalars['ID'] | null),le?: (Scalars['ID'] | null),lt?: (Scalars['ID'] | null),ge?: (Scalars['ID'] | null),gt?: (Scalars['ID'] | null),in?: (Scalars['ID'][] | null)}

export interface MutateNoteInput {id: Scalars['ID'],text?: (Scalars['String'] | null),archived?: (Scalars['Boolean'] | null)}

export interface MutationRequest{
    createNote?: [{input: CreateNoteInput},NoteRequest]
    updateNote?: [{input: MutateNoteInput},NoteRequest]
    deleteNote?: [{input: MutateNoteInput},NoteRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** @model */
export interface NoteRequest{
    id?: boolean | number
    text?: boolean | number
    archived?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteFilter {id?: (IDInput | null),text?: (StringInput | null),archived?: (BooleanInput | null),and?: (NoteFilter[] | null),or?: (NoteFilter[] | null),not?: (NoteFilter | null)}

export interface NoteResultListRequest{
    items?: NoteRequest
    offset?: boolean | number
    limit?: boolean | number
    count?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NoteSubscriptionFilter {and?: (NoteSubscriptionFilter[] | null),or?: (NoteSubscriptionFilter[] | null),not?: (NoteSubscriptionFilter | null),id?: (IDInput | null),text?: (StringInput | null),archived?: (BooleanInput | null)}

export interface OrderByInput {field: Scalars['String'],order?: (SortDirectionEnum | null)}

export interface PageRequest {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null)}

export interface QueryRequest{
    getNote?: [{id: Scalars['ID']},NoteRequest]
    findNotes?: [{filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)},NoteResultListRequest] | NoteResultListRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StringInput {ne?: (Scalars['String'] | null),eq?: (Scalars['String'] | null),le?: (Scalars['String'] | null),lt?: (Scalars['String'] | null),ge?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),contains?: (Scalars['String'] | null),startsWith?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null)}

export interface SubscriptionRequest{
    newNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    updatedNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    deletedNote?: [{filter?: (NoteSubscriptionFilter | null)},NoteRequest] | NoteRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


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


export interface MutationPromiseChain{
    createNote: ((args: {input: CreateNoteInput}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    updateNote: ((args: {input: MutateNoteInput}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    deleteNote: ((args: {input: MutateNoteInput}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>})
}

export interface MutationObservableChain{
    createNote: ((args: {input: CreateNoteInput}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    updateNote: ((args: {input: MutateNoteInput}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    deleteNote: ((args: {input: MutateNoteInput}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>})
}


/** @model */
export interface NotePromiseChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    archived: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>})
}


/** @model */
export interface NoteObservableChain{
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    text: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    archived: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>})
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
    getNote: ((args: {id: Scalars['ID']}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Promise<(FieldsSelection<Note, R> | undefined)>}),
    findNotes: ((args?: {filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => NoteResultListPromiseChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Promise<FieldsSelection<NoteResultList, R>>})&(NoteResultListPromiseChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Promise<FieldsSelection<NoteResultList, R>>})
}

export interface QueryObservableChain{
    getNote: ((args: {id: Scalars['ID']}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: (FieldsSelection<Note, R> | undefined)) => Observable<(FieldsSelection<Note, R> | undefined)>}),
    findNotes: ((args?: {filter?: (NoteFilter | null),page?: (PageRequest | null),orderBy?: (OrderByInput | null)}) => NoteResultListObservableChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Observable<FieldsSelection<NoteResultList, R>>})&(NoteResultListObservableChain & {get: <R extends NoteResultListRequest>(request: R, defaultValue?: FieldsSelection<NoteResultList, R>) => Observable<FieldsSelection<NoteResultList, R>>})
}

export interface SubscriptionPromiseChain{
    newNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>}),
    updatedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>}),
    deletedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})&(NotePromiseChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Promise<FieldsSelection<Note, R>>})
}

export interface SubscriptionObservableChain{
    newNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>}),
    updatedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>}),
    deletedNote: ((args?: {filter?: (NoteSubscriptionFilter | null)}) => NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})&(NoteObservableChain & {get: <R extends NoteRequest>(request: R, defaultValue?: FieldsSelection<Note, R>) => Observable<FieldsSelection<Note, R>>})
}