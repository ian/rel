import {
  Field,
  Fields,
  Guard,
  GraphQLEndpoint,
  GraphQLEndpointOptions,
  GraphQLOperation,
  Handler,
  ReducedGraphQLEndpoint,
  EndpointType,
} from "../types"

export default class GraphQLEndpointImpl implements GraphQLEndpoint {
  _operation: GraphQLOperation
  _name: string
  _params: Fields = null
  _guard: Guard
  _returns: Field
  _handler: Handler

  constructor(operation: GraphQLOperation, ...opts: GraphQLEndpointOptions) {
    if (opts.length === 4) {
      const [_name, _params, _returns, _handler] = opts
      Object.assign(this, { _name, _params, _returns, _handler })
    } else if (opts.length === 3) {
      const [_name, _returns, _handler] = opts
      Object.assign(this, { _name, _returns, _handler })
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

  handler(handler: Handler) {
    this._handler = handler
    return this
  }

  reduce(): ReducedGraphQLEndpoint {
    const reducedReturn = this._returns.reduce()
    const { returns, required } = reducedReturn

    const reduced = {
      operation: this._operation,
      name: this._name,
      returns,
      required,
      handler: this._handler,
    }

    if (this._params) {
      Object.assign(reduced, {
        params: Object.entries(this._params).reduce((acc, p) => {
          const [name, property] = p
          acc[name] = property.reduce()
          return acc
        }, {}),
      })
    }

    return reduced
  }
}
