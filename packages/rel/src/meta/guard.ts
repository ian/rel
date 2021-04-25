import { Guard, Handler, ReducibleDirective } from "../types"

export default class GuardImpl implements Guard {
  _handler: Handler
  _name: string

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  handler(handler: Handler) {
    this._handler = handler
    return this
  }

  reduce(): ReducibleDirective {
    return {
      name: this._name,
      resolver: this._handler,
    }
  }
}
