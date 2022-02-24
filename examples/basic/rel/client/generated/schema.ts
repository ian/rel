import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    Boolean: boolean,
    DateTime: any,
    Float: number,
    ID: string,
    Int: number,
    String: string,
}

export interface Genre {
    createdAt: Scalars['DateTime']
    id: Scalars['ID']
    movies: (Movie | undefined)[]
    name?: Scalars['String']
    updatedAt?: Scalars['DateTime']
    __typename: 'Genre'
}

export interface Movie {
    createdAt: Scalars['DateTime']
    genres: (Genre | undefined)[]
    id: Scalars['ID']
    rating?: Scalars['Float']
    title: Scalars['String']
    updatedAt?: Scalars['DateTime']
    year?: Scalars['Int']
    __typename: 'Movie'
}

export interface Mutation {
    /** Create a single Genre using 'data' values */
    createGenre?: Genre
    /** Create a single Movie using 'data' values */
    createMovie?: Movie
    /** Delete one Genre by 'where', returns node if found otherwise null */
    deleteGenre?: Genre
    /** Delete multiple Genres by 'where', returns number of nodes deleted */
    deleteManyGenre: Scalars['Int']
    /** Delete multiple Movies by 'where', returns number of nodes deleted */
    deleteManyMovie: Scalars['Int']
    /** Delete one Movie by 'where', returns node if found otherwise null */
    deleteMovie?: Movie
    /** Merge will find or create a Genre matching 'where', if found will update using data, if not found will create using data + where */
    mergeGenre?: Genre
    /** Merge will find or create a Movie matching 'where', if found will update using data, if not found will create using data + where */
    mergeMovie?: Movie
    /** Update first Genre matching 'where' */
    updateGenre?: Genre
    /** Update multiple Genres matching 'where', sets all nodes to 'data' values */
    updateManyGenre: (Genre | undefined)[]
    /** Update multiple Movies matching 'where', sets all nodes to 'data' values */
    updateManyMovie: (Movie | undefined)[]
    /** Update first Movie matching 'where' */
    updateMovie?: Movie
    __typename: 'Mutation'
}

export interface Query {
    /** Count number of Genre nodes matching 'where' */
    countGenres: Scalars['Int']
    /** Count number of Movie nodes matching 'where' */
    countMovies: Scalars['Int']
    /** Find multiple Genres matching 'where' */
    findManyGenres: (Genre | undefined)[]
    /** Find multiple Movies matching 'where' */
    findManyMovies: (Movie | undefined)[]
    /** Find one Genre matching 'where' */
    findOneGenre?: Genre
    /** Find one Movie matching 'where' */
    findOneMovie?: Movie
    __typename: 'Query'
}

export interface GenreRequest{
    createdAt?: boolean | number
    id?: boolean | number
    movies?: [{limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (MovieWhere | null)},MovieRequest] | MovieRequest
    name?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GenreCreateInput {name?: (Scalars['String'] | null)}

export interface GenreUpdateInput {name?: (Scalars['String'] | null)}

export interface GenreWhere {AND?: (GenreWhere[] | null),NOT?: (GenreWhere[] | null),OR?: (GenreWhere[] | null),id?: (Scalars['ID'] | null),name?: (Scalars['String'] | null)}

export interface MovieRequest{
    createdAt?: boolean | number
    genres?: [{limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (GenreWhere | null)},GenreRequest] | GenreRequest
    id?: boolean | number
    rating?: boolean | number
    title?: boolean | number
    updatedAt?: boolean | number
    year?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MovieCreateInput {rating?: (Scalars['Float'] | null),title: Scalars['String'],year?: (Scalars['Int'] | null)}

export interface MovieUpdateInput {rating?: (Scalars['Float'] | null),title?: (Scalars['String'] | null),year?: (Scalars['Int'] | null)}

export interface MovieWhere {AND?: (MovieWhere[] | null),NOT?: (MovieWhere[] | null),OR?: (MovieWhere[] | null),id?: (Scalars['ID'] | null),rating?: (Scalars['Float'] | null),title?: (Scalars['String'] | null),year?: (Scalars['Int'] | null)}

export interface MutationRequest{
    /** Create a single Genre using 'data' values */
    createGenre?: [{data: GenreCreateInput},GenreRequest]
    /** Create a single Movie using 'data' values */
    createMovie?: [{data: MovieCreateInput},MovieRequest]
    /** Delete one Genre by 'where', returns node if found otherwise null */
    deleteGenre?: [{where: GenreWhere},GenreRequest]
    /** Delete multiple Genres by 'where', returns number of nodes deleted */
    deleteManyGenre?: [{where: GenreWhere}]
    /** Delete multiple Movies by 'where', returns number of nodes deleted */
    deleteManyMovie?: [{where: MovieWhere}]
    /** Delete one Movie by 'where', returns node if found otherwise null */
    deleteMovie?: [{where: MovieWhere},MovieRequest]
    /** Merge will find or create a Genre matching 'where', if found will update using data, if not found will create using data + where */
    mergeGenre?: [{data?: (GenreUpdateInput | null),where: GenreWhere},GenreRequest]
    /** Merge will find or create a Movie matching 'where', if found will update using data, if not found will create using data + where */
    mergeMovie?: [{data?: (MovieUpdateInput | null),where: MovieWhere},MovieRequest]
    /** Update first Genre matching 'where' */
    updateGenre?: [{data: GenreUpdateInput,where: GenreWhere},GenreRequest]
    /** Update multiple Genres matching 'where', sets all nodes to 'data' values */
    updateManyGenre?: [{data: GenreUpdateInput,where: GenreWhere},GenreRequest]
    /** Update multiple Movies matching 'where', sets all nodes to 'data' values */
    updateManyMovie?: [{data: MovieUpdateInput,where: MovieWhere},MovieRequest]
    /** Update first Movie matching 'where' */
    updateMovie?: [{data: MovieUpdateInput,where: MovieWhere},MovieRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    /** Count number of Genre nodes matching 'where' */
    countGenres?: [{where?: (GenreWhere | null)}] | boolean | number
    /** Count number of Movie nodes matching 'where' */
    countMovies?: [{where?: (MovieWhere | null)}] | boolean | number
    /** Find multiple Genres matching 'where' */
    findManyGenres?: [{limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (GenreWhere | null)},GenreRequest] | GenreRequest
    /** Find multiple Movies matching 'where' */
    findManyMovies?: [{limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (MovieWhere | null)},MovieRequest] | MovieRequest
    /** Find one Genre matching 'where' */
    findOneGenre?: [{where?: (GenreWhere | null)},GenreRequest] | GenreRequest
    /** Find one Movie matching 'where' */
    findOneMovie?: [{where?: (MovieWhere | null)},MovieRequest] | MovieRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Genre_possibleTypes = ['Genre']
export const isGenre = (obj?: { __typename?: any } | null): obj is Genre => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGenre"')
  return Genre_possibleTypes.includes(obj.__typename)
}



const Movie_possibleTypes = ['Movie']
export const isMovie = (obj?: { __typename?: any } | null): obj is Movie => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMovie"')
  return Movie_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}


export interface GenrePromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    movies: ((args?: {limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (MovieWhere | null)}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Promise<(FieldsSelection<Movie, R> | undefined)[]>})&({get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Promise<(FieldsSelection<Movie, R> | undefined)[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>})
}

export interface GenreObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    movies: ((args?: {limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (MovieWhere | null)}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Observable<(FieldsSelection<Movie, R> | undefined)[]>})&({get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Observable<(FieldsSelection<Movie, R> | undefined)[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>})
}

export interface MoviePromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    genres: ((args?: {limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (GenreWhere | null)}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Promise<(FieldsSelection<Genre, R> | undefined)[]>})&({get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Promise<(FieldsSelection<Genre, R> | undefined)[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    rating: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    year: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface MovieObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    genres: ((args?: {limit?: (Scalars['Int'] | null),skip?: (Scalars['Int'] | null),where?: (GenreWhere | null)}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Observable<(FieldsSelection<Genre, R> | undefined)[]>})&({get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Observable<(FieldsSelection<Genre, R> | undefined)[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    rating: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    title: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    year: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface MutationPromiseChain{
    
/** Create a single Genre using 'data' values */
createGenre: ((args: {data: GenreCreateInput}) => GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Create a single Movie using 'data' values */
createMovie: ((args: {data: MovieCreateInput}) => MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Delete one Genre by 'where', returns node if found otherwise null */
deleteGenre: ((args: {where: GenreWhere}) => GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Delete multiple Genres by 'where', returns number of nodes deleted */
deleteManyGenre: ((args: {where: GenreWhere}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Delete multiple Movies by 'where', returns number of nodes deleted */
deleteManyMovie: ((args: {where: MovieWhere}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Delete one Movie by 'where', returns node if found otherwise null */
deleteMovie: ((args: {where: MovieWhere}) => MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Merge will find or create a Genre matching 'where', if found will update using data, if not found will create using data + where */
mergeGenre: ((args: {data?: (GenreUpdateInput | null),where: GenreWhere}) => GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Merge will find or create a Movie matching 'where', if found will update using data, if not found will create using data + where */
mergeMovie: ((args: {data?: (MovieUpdateInput | null),where: MovieWhere}) => MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Update first Genre matching 'where' */
updateGenre: ((args: {data: GenreUpdateInput,where: GenreWhere}) => GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Update multiple Genres matching 'where', sets all nodes to 'data' values */
updateManyGenre: ((args: {data: GenreUpdateInput,where: GenreWhere}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Promise<(FieldsSelection<Genre, R> | undefined)[]>}),
    
/** Update multiple Movies matching 'where', sets all nodes to 'data' values */
updateManyMovie: ((args: {data: MovieUpdateInput,where: MovieWhere}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Promise<(FieldsSelection<Movie, R> | undefined)[]>}),
    
/** Update first Movie matching 'where' */
updateMovie: ((args: {data: MovieUpdateInput,where: MovieWhere}) => MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>})
}

export interface MutationObservableChain{
    
/** Create a single Genre using 'data' values */
createGenre: ((args: {data: GenreCreateInput}) => GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Create a single Movie using 'data' values */
createMovie: ((args: {data: MovieCreateInput}) => MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Delete one Genre by 'where', returns node if found otherwise null */
deleteGenre: ((args: {where: GenreWhere}) => GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Delete multiple Genres by 'where', returns number of nodes deleted */
deleteManyGenre: ((args: {where: GenreWhere}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Delete multiple Movies by 'where', returns number of nodes deleted */
deleteManyMovie: ((args: {where: MovieWhere}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Delete one Movie by 'where', returns node if found otherwise null */
deleteMovie: ((args: {where: MovieWhere}) => MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Merge will find or create a Genre matching 'where', if found will update using data, if not found will create using data + where */
mergeGenre: ((args: {data?: (GenreUpdateInput | null),where: GenreWhere}) => GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Merge will find or create a Movie matching 'where', if found will update using data, if not found will create using data + where */
mergeMovie: ((args: {data?: (MovieUpdateInput | null),where: MovieWhere}) => MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>}),
    
/** Update first Genre matching 'where' */
updateGenre: ((args: {data: GenreUpdateInput,where: GenreWhere}) => GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Update multiple Genres matching 'where', sets all nodes to 'data' values */
updateManyGenre: ((args: {data: GenreUpdateInput,where: GenreWhere}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Observable<(FieldsSelection<Genre, R> | undefined)[]>}),
    
/** Update multiple Movies matching 'where', sets all nodes to 'data' values */
updateManyMovie: ((args: {data: MovieUpdateInput,where: MovieWhere}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Observable<(FieldsSelection<Movie, R> | undefined)[]>}),
    
/** Update first Movie matching 'where' */
updateMovie: ((args: {data: MovieUpdateInput,where: MovieWhere}) => MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>})
}

export interface QueryPromiseChain{
    
/** Count number of Genre nodes matching 'where' */
countGenres: ((args?: {where?: (GenreWhere | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})&({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Count number of Movie nodes matching 'where' */
countMovies: ((args?: {where?: (MovieWhere | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})&({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Find multiple Genres matching 'where' */
findManyGenres: ((args?: {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (GenreWhere | null)}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Promise<(FieldsSelection<Genre, R> | undefined)[]>})&({get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Promise<(FieldsSelection<Genre, R> | undefined)[]>}),
    
/** Find multiple Movies matching 'where' */
findManyMovies: ((args?: {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (MovieWhere | null)}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Promise<(FieldsSelection<Movie, R> | undefined)[]>})&({get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Promise<(FieldsSelection<Movie, R> | undefined)[]>}),
    
/** Find one Genre matching 'where' */
findOneGenre: ((args?: {where?: (GenreWhere | null)}) => GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>})&(GenrePromiseChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Promise<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Find one Movie matching 'where' */
findOneMovie: ((args?: {where?: (MovieWhere | null)}) => MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>})&(MoviePromiseChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Promise<(FieldsSelection<Movie, R> | undefined)>})
}

export interface QueryObservableChain{
    
/** Count number of Genre nodes matching 'where' */
countGenres: ((args?: {where?: (GenreWhere | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})&({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Count number of Movie nodes matching 'where' */
countMovies: ((args?: {where?: (MovieWhere | null)}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})&({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Find multiple Genres matching 'where' */
findManyGenres: ((args?: {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (GenreWhere | null)}) => {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Observable<(FieldsSelection<Genre, R> | undefined)[]>})&({get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)[]) => Observable<(FieldsSelection<Genre, R> | undefined)[]>}),
    
/** Find multiple Movies matching 'where' */
findManyMovies: ((args?: {limit?: (Scalars['Int'] | null),offset?: (Scalars['Int'] | null),where?: (MovieWhere | null)}) => {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Observable<(FieldsSelection<Movie, R> | undefined)[]>})&({get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)[]) => Observable<(FieldsSelection<Movie, R> | undefined)[]>}),
    
/** Find one Genre matching 'where' */
findOneGenre: ((args?: {where?: (GenreWhere | null)}) => GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>})&(GenreObservableChain & {get: <R extends GenreRequest>(request: R, defaultValue?: (FieldsSelection<Genre, R> | undefined)) => Observable<(FieldsSelection<Genre, R> | undefined)>}),
    
/** Find one Movie matching 'where' */
findOneMovie: ((args?: {where?: (MovieWhere | null)}) => MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>})&(MovieObservableChain & {get: <R extends MovieRequest>(request: R, defaultValue?: (FieldsSelection<Movie, R> | undefined)) => Observable<(FieldsSelection<Movie, R> | undefined)>})
}