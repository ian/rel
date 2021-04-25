import {
  EndpointType,
  HTTPEndpoint,
  HTTPMethod,
  HTTPEndpointOptions,
  Handler,
} from "../types"

export default class HTTPEndpointImpl implements HTTPEndpoint {
  _method: HTTPMethod
  _url: string
  _handler: Handler

  constructor(method: HTTPMethod, ...opts: HTTPEndpointOptions) {
    this._method = method

    if (opts.length === 2) {
      const [_url, _handler] = opts
      Object.assign(this, { _url, _handler })
    } else throw new Error("HTTP Endpoint takes 2 arguments, received" + opts)
  }

  get type() {
    return EndpointType.HTTP
  }

  handler(handler: Handler) {
    this._handler = handler
    return this
  }

  reduce() {
    return {
      method: this._method,
      url: this._url,
      handler: this._handler,
    }
  }
}
