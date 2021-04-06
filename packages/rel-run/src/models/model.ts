import _ from "lodash"
import { uuid, dateTime } from "../fields"
import { Accessors, Fields, ModelProps, ModelOpts, Mutators } from "../types"

import { findEndpoints } from "./find"
import { listEndpoints } from "./list"
import { createEndpoints } from "./create"
import { updateEndpoints } from "./update"
import { deleteEndpoints } from "./delete"

import { splitProps } from "./util"

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

const DEFAULT_ACCESSORS = {
  find: true,
  list: true,
}

const DEFAULT_MUTATORS = {
  create: true,
  update: true,
  delete: true,
}

export default class Model {
  _opts: Opts = {}
  _guard: string = null

  _autogen: Fields = {}
  _props: ModelProps
  _accessors: Accessors = DEFAULT_ACCESSORS
  _mutators: Mutators = DEFAULT_MUTATORS

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

    this.props(props)
    this.guard(_opts.guard)
    this.accessors(_opts.accessors)
    this.mutators(_opts.mutators)

    this._opts = _opts
  }

  private guard(scope: string) {
    this._guard = scope
  }

  private props(props: ModelProps) {
    this._props = props
  }

  private accessors(accessors?: Accessors | boolean) {
    if (accessors === false) {
      this._accessors = null
    } else if (!accessors || accessors === true) {
      Object.assign(this._accessors, DEFAULT_ACCESSORS)
    } else {
      Object.assign(this._accessors, accessors)
    }
  }

  private mutators(mutators?: Mutators | boolean) {
    if (mutators === false) {
      this._mutators = null
    } else if (!mutators || mutators === true) {
      Object.assign(this._mutators, DEFAULT_MUTATORS)
    } else {
      Object.assign(this._mutators, mutators)
    }
  }

  reduce(reducer, { modelName }): void {
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
      ..._relations,
    }

    if (this._opts.input) {
      reducer({
        inputs: {
          [`${modelName}Input`]: {
            ...inputFields,
          },
        },
      })
    }

    if (this._opts.output) {
      reducer({
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

    if (this._accessors?.find) {
      reducer({
        endpoints: findEndpoints(modelName, this._accessors.find, _fields),
      })
    }

    if (this._accessors?.list) {
      reducer({
        endpoints: listEndpoints(modelName, this._accessors.list, _fields),
      })
    }

    if (this._mutators?.create) {
      reducer({
        endpoints: createEndpoints(modelName, this._mutators.create, _fields),
      })
    }

    if (this._mutators?.update) {
      reducer({
        endpoints: updateEndpoints(modelName, this._mutators.update, _fields),
      })
    }

    if (this._mutators?.delete) {
      reducer({
        endpoints: deleteEndpoints(modelName, this._mutators.delete, _fields),
      })
    }
  }
}
