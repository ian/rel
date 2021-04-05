import { Field, Resolver } from "../types"

export default class FieldImpl implements Field {
  _label: string
  _required: boolean = false
  _params: object
  _guard: string = null
  _autogen: boolean = false
  _resolver: Resolver = null
  _default: (RuntimeDefault) => any | any

  constructor(label: string) {
    this._label = label
  }

  get label() {
    return this._label
  }

  required(r = true): Field {
    this._required = r
    return this
  }

  guard(scope): Field {
    this._guard = scope
    return this
  }

  resolver(resolver: Resolver): Field {
    this._resolver = resolver
    return this
  }

  default(valueOrFn): Field {
    this._default = valueOrFn
    return this
  }

  async resolve(opts): Promise<any> {
    if (this._resolver) {
      return this._resolver(opts)
    } else {
      const { fieldName, obj } = opts
      return obj[fieldName]
    }
  }

  reduce(reducer, { fieldName, modelName }) {
    reducer({
      outputs: {
        [modelName]: {
          [fieldName]: this,
        },
      },
    })
  }
}
