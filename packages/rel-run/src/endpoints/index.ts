import { Field, Resolver } from "../types"
import { GraphQLEndpointOpts } from "./graphql"

import QueryEndpoint from "./query"
import MutationEndpoint from "./mutation"

import GetEndpoint from "./get"
import PostEndpoint from "./post"
import PutEndpoint from "./put"
import DeleteEndpoint from "./delete"

export default {
  query: (label: string, returns: Field, opts?: GraphQLEndpointOpts) =>
    new QueryEndpoint(label, returns, opts),
  mutation: (label: string, returns: Field, opts?: GraphQLEndpointOpts) =>
    new MutationEndpoint(label, returns, opts),
  get: (url: string) => new GetEndpoint(url),
  post: (url: string) => new PostEndpoint(url),
  put: (url: string) => new PutEndpoint(url),
  delete: (url: string) => new DeleteEndpoint(url),
}

export { default as GraphQLEndpoint } from "./graphql"
export { default as HTTPEndpoint } from "./http"
export { default as GetEndpoint } from "./get"
export { default as PostEndpoint } from "./post"
export { default as PutEndpoint } from "./put"
export { default as DeleteEndpoint } from "./delete"
