import {
  Rel,
  GraphQLOperation,
  GraphQLEndpointOptions,
  HTTPMethod,
  HTTPEndpointOptions,
  Model,
  Input,
  Output,
  ModelProperties,
  ModelOptions,
  InputProperties,
  OutputProperties,
} from "../types"

import {
  Boolean,
  UUID,
  Int,
  Float,
  DateTime,
  Geo,
  PhoneNumber,
  String,
  Slug,
  Ref,
  Array,
} from "../fields"

import Relation from "./relation"

import ModelImpl from "./model"
import InputImpl from "./input"
import OutputImpl from "./output"
import GraphQLEndpoint from "./graphql"
import HTTPEndpoint from "./http"

import Guard from "./guard"

export default {
  boolean: () => new Boolean(),
  uuid: () => new UUID(),
  int: () => new Int(),
  float: () => new Float(),
  dateTime: () => new DateTime(),
  geo: () => new Geo(),
  phoneNumber: () => new PhoneNumber(),
  string: () => new String(),
  slug: (opts) => new Slug(opts),

  ref: (model) => new Ref(model),
  array: (contains) => new Array(contains),

  model: (name: string, props: ModelProperties, opts?: ModelOptions): Model =>
    new ModelImpl(name, props, opts),

  input: (name: string, props: InputProperties): Input =>
    new InputImpl(name, props),
  output: (name: string, props: OutputProperties): Output =>
    new OutputImpl(name, props),

  relation: (label: string) => new Relation(label),

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

  guard: (name: string) => new Guard(name),
} as Rel

export { default as Input } from "./input"
export { default as Output } from "./output"
export { default as Model } from "./model"

export { default as Relation } from "./relation"

export { default as GraphQLEndpoint } from "./graphql"
export { default as HTTPEndpoint } from "./http"
