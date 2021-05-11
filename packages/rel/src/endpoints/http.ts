import {
  EndpointType,
  HTTPEndpoint,
  HTTPMethod,
  HTTPEndpointOptions,
  Resolver,
  HydrationOpts,
} from "../types"

export default class HTTPEndpointImpl implements HTTPEndpoint {
  _method: HTTPMethod
  _url: string
  _resolver: Resolver

  constructor(method: HTTPMethod, ...opts: HTTPEndpointOptions) {
    this._method = method

    if (opts.length === 2) {
      const [_url, _resolver] = opts
      Object.assign(this, { _url, _resolver })
    } else throw new Error("HTTP Endpoint takes 2 arguments, received" + opts)
  }

  get type() {
    return EndpointType.HTTP
  }

  resolve(resolver: Resolver) {
    this._resolver = resolver
    return this
  }

  hydrate(hydration: HydrationOpts) {
    // @todo - hydrate http endpoint
  }
}
