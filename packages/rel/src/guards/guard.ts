import { Guard, Resolver } from "../types"

export default class GuardImpl implements Guard {
  _resolver: Resolver
  _name: string

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  resolve(resolver: Resolver) {
    this._resolver = resolver
    return this
  }
}
