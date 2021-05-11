import {
  GraphQLOperation,
  GraphQLEndpointOptions,
  HTTPMethod,
  HTTPEndpointOptions,
} from "../types"

import GraphQLEndpoint from "../endpoints/graphql"
import HTTPEndpoint from "../endpoints/http"

export { default as GraphQLEndpoint } from "../endpoints/graphql"
export { default as HTTPEndpoint } from "../endpoints/http"

export default {
  query: (...opts: GraphQLEndpointOptions) =>
    new GraphQLEndpoint(GraphQLOperation.QUERY, ...opts),
  mutation: (...opts: GraphQLEndpointOptions) =>
    new GraphQLEndpoint(GraphQLOperation.MUTATION, ...opts),

  get: (...opts: HTTPEndpointOptions) =>
    new HTTPEndpoint(HTTPMethod.GET, ...opts),
  post: (...opts: HTTPEndpointOptions) =>
    new HTTPEndpoint(HTTPMethod.POST, ...opts),
  put: (...opts: HTTPEndpointOptions) =>
    new HTTPEndpoint(HTTPMethod.PUT, ...opts),
  delete: (...opts: HTTPEndpointOptions) =>
    new HTTPEndpoint(HTTPMethod.DELETE, ...opts),
}
