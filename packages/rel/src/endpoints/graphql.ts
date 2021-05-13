import {
  Field,
  Fields,
  Guard,
  GraphQLEndpoint,
  GraphQLEndpointOptions,
  GraphQLOperation,
  Resolver,
  EndpointType,
  HydrationOpts,
} from "../types"
import { composeInputProps } from "../util/props"

export default class GraphQLEndpointImpl implements GraphQLEndpoint {
  _operation: GraphQLOperation
  _name: string
  _params: Fields = null
  _guard: Guard
  _returns: Field
  _resolver: Resolver

  constructor(operation: GraphQLOperation, ...opts: GraphQLEndpointOptions) {
    if (opts.length === 4) {
      const [_name, _params, _returns, _resolver] = opts
      Object.assign(this, { _name, _params, _returns, _resolver })
    } else if (opts.length === 3) {
      const [_name, _returns, _resolver] = opts
      Object.assign(this, { _name, _returns, _resolver })
    } else
      throw new Error("GraphQL Endpoint takes 3-4 arguments, received" + opts)

    this._operation = operation
  }

  get type() {
    return EndpointType.GRAPHQL
  }

  get operation() {
    return this._operation
  }

  guard(guard: Guard) {
    this._guard = guard
    return this
  }

  resolve(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  hydrate(opts: HydrationOpts) {
    const { composer } = opts
    const args = this._params ? composeInputProps(this._params) : null
    const type = this._returns.isRequired
      ? `${this._returns.outputType}!`
      : this._returns.outputType

    switch (this._operation) {
      case GraphQLOperation.QUERY:
        composer.Query.addFields({
          [this._name]: {
            type,
            args,
            resolve: this._resolver,
          },
        })
        break
      case GraphQLOperation.MUTATION:
        composer.Mutation.addFields({
          [this._name]: {
            type,
            args,
            resolve: this._resolver,
          },
        })
        break
      default:
        throw new Error(
          "Unsupported GraphQL Endpoint Operation" + this._operation
        )
    }
  }
}
