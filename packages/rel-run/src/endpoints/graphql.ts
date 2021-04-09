import { Field } from "../fields"
import { Guard, Params, GraphQLOperationType, Resolver } from "../types"

export type GraphQLEndpointOpts = {
  params?: Params
  guard?: Guard
}

export default class GraphQLEndpoint {
  _type: GraphQLOperationType
  _label: string
  _params: Params
  _guard: Guard
  _returns: Field
  _resolver: Resolver

  constructor(
    type: GraphQLOperationType,
    label: string,
    returns: Field,
    opts: GraphQLEndpointOpts = {}
  ) {
    const { params, guard } = opts

    this._type = type
    this._label = label
    this._returns = returns
    this._params = params
    this._guard = guard
  }

  resolver(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  reduce(reducer) {
    reducer.reduce({
      graphQLEndpoints: {
        type: this._type,
        label: this._label,
        params: this._params,
        guard: this._guard,
        returns: this._returns,
        resolver: this._resolver,
      },
    })
  }
}
