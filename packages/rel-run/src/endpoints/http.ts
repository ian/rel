import { HTTPMethods, Resolver } from "../types"

export default class HTTPEndpoint {
  _method: string
  _url: string
  _resolver: Resolver

  constructor(method: HTTPMethods, url: string) {
    this._method = method
    this._url = url
  }

  resolver(resolver: Resolver) {
    this._resolver = resolver
  }

  reduce(reducer) {
    reducer.reduce({
      httpEndpoints: {
        method: this._method,
        url: this._url,
        resolver: this._resolver,
      },
    })
  }
}
