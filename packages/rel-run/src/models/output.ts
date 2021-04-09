import _ from "lodash"
import { ModelProps, ModelOpts } from "../types"

import { splitProps } from "../util/props"
import { Reducer } from "../server"

export default class Output {
  _guard: string = null
  _props: ModelProps

  constructor(props: ModelProps, opts: ModelOpts = {}) {
    const _opts = {
      ...opts,
    }

    this.props(props)
    this.guard(_opts.guard)
  }

  private guard(scope: string) {
    this._guard = scope
  }

  private props(props: ModelProps) {
    this._props = props
  }

  reduce(reducer: Reducer, { modelName }) {
    const [_fields, _relations] = splitProps(this._props)

    reducer.reduce({
      outputs: {
        [modelName]: {
          ..._fields,
        },
      },
    })

    if (_relations) {
      Object.entries(_relations).forEach((entry) => {
        const [fieldName, rel] = entry
        rel.reduce(reducer, { modelName, fieldName })
      })
    }
  }
}
