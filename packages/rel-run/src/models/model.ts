import _ from "lodash"
import { uuid, dateTime } from "../fields"
import { Fields, ModelProps, ModelOpts, ModelEndpoints } from "../types"

import endpointReducer from "./reducer"
import { splitProps } from "../util/props"
import { Reducer } from "../server"

type Opts = {
  id?: boolean
  timestamps?: boolean
  input?: boolean
  output?: boolean
}

const DEFAULT_OPTS = {
  id: true,
  timestamps: true,
  input: true,
  output: true,
}

const DEFAULT_CRUD = {
  find: true,
  list: true,
  create: true,
  update: true,
  delete: true,
}
export default class Model {
  _input: boolean
  _output: boolean
  _guard: string = null

  _autogen: Fields = {}
  _props: ModelProps = {}
  _endpoints: ModelEndpoints = {}

  constructor(props: ModelProps, opts: ModelOpts = {}) {
    const _opts = {
      ...DEFAULT_OPTS,
      ...opts,
    }

    if (_opts.id) this._autogen.id = uuid().required()
    if (_opts.timestamps) {
      this._autogen.createdAt = dateTime().required()
      this._autogen.updatedAt = dateTime().required()
    }

    this._input = _opts.input
    this._output = _opts.output

    this.props(props)
    this.guard(_opts.guard)
    this.endpoints(_opts.endpoints)
  }

  static splitProps(props: ModelProps) {
    return splitProps(props)
  }

  guard(scope: string) {
    this._guard = scope
  }

  props(props: ModelProps) {
    this._props = props
  }

  endpoints(endpoints: ModelEndpoints) {
    if (endpoints === false) {
      return
    } else if (!endpoints || endpoints === true) {
      this._endpoints = DEFAULT_CRUD
    } else {
      Object.assign(this._endpoints, endpoints)
    }
  }

  reduce(reducer: Reducer, { modelName }) {
    if (_.isEmpty(this._props)) {
      throw new Error(
        `Model ${modelName} must have at least one field or relation`
      )
    }

    const [_fields, _relations] = splitProps(this._props)

    const inputFields = {
      ..._fields,
    }
    const outputFields = {
      ...this._autogen,
      ..._fields,
    }

    if (this._input) {
      reducer.reduce({
        inputs: {
          [`${modelName}Input`]: {
            ...inputFields,
          },
        },
      })
    }

    if (this._output) {
      reducer.reduce({
        outputs: {
          [modelName]: {
            ...outputFields,
          },
        },
      })
    }

    if (_relations) {
      Object.entries(_relations).forEach((entry) => {
        const [fieldName, rel] = entry
        rel.reduce(reducer, { modelName, fieldName })
      })
    }

    endpointReducer(modelName, this._endpoints, outputFields)(reducer)
  }
}
