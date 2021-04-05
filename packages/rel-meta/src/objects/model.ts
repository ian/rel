import _ from "lodash"
import { uuid, dateTime, type } from "../index"
import { Accessors, Fields, Model, Mutators, Relations } from "@reldb/types"

import {
  findEndpoints,
  listEndpoints,
  createEndpoints,
  updateEndpoints,
  deleteEndpoints,
} from "."

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

export default class ModelImpl implements Model {
  _opts: Opts = {}
  _guard: string = null

  _autogen: Fields = {}
  _fields: Fields = {}
  _relations: Relations = {}
  _accessors: Accessors = DEFAULT_ACCESSORS
  _mutators: Mutators = DEFAULT_MUTATORS

  constructor(opts: Opts = {}) {
    const _opts = {
      ...DEFAULT_OPTS,
      ...opts,
    }

    if (_opts.id) this._autogen.id = uuid().required()
    if (_opts.timestamps) {
      this._autogen.createdAt = dateTime().required()
      this._autogen.updatedAt = dateTime().required()
    }

    this._opts = _opts
  }

  guard(scope: string): ModelImpl {
    this._guard = scope
    return this
  }

  fields(fields: Fields): ModelImpl {
    this._fields = fields
    return this
  }

  relations(relations: Relations): ModelImpl {
    this._relations = relations
    return this
  }

  accessors(accessors?: Accessors | boolean): ModelImpl {
    if (accessors === false) {
      this._accessors = null
    } else if (!accessors || accessors === true) {
      Object.assign(this._accessors, DEFAULT_ACCESSORS)
    } else {
      Object.assign(this._accessors, accessors)
    }

    return this
  }

  mutators(mutators?: Mutators | boolean): ModelImpl {
    if (mutators === false) {
      this._mutators = null
    } else if (!mutators || mutators === true) {
      Object.assign(this._mutators, DEFAULT_MUTATORS)
    } else {
      Object.assign(this._mutators, mutators)
    }

    return this
  }

  reduce(reducer, { modelName }): void {
    if (_.isEmpty(this._fields) && _.isEmpty(this._relations)) {
      throw new Error(
        `Model ${modelName} must have at least one field or relation`
      )
    }

    const inputFields = {
      ...this._fields,
    }
    const outputFields = {
      ...this._autogen,
      ...this._fields,
      ...this._relations,
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

    if (this._relations) {
      Object.entries(this._relations).forEach((entry) => {
        const [fieldName, rel] = entry
        rel.reduce(reducer, { modelName, fieldName })
      })
    }

    if (this._accessors?.find) {
      reducer({
        endpoints: findEndpoints(modelName, this._accessors.find, this._fields),
      })
    }

    if (this._accessors?.list) {
      reducer({
        endpoints: listEndpoints(modelName, this._accessors.list, this._fields),
      })
    }

    if (this._mutators?.create) {
      reducer({
        endpoints: createEndpoints(
          modelName,
          this._mutators.create,
          this._fields
        ),
      })
    }

    if (this._mutators?.update) {
      reducer({
        endpoints: updateEndpoints(
          modelName,
          this._mutators.update,
          this._fields
        ),
      })
    }

    if (this._mutators?.delete) {
      reducer({
        endpoints: deleteEndpoints(
          modelName,
          this._mutators.delete,
          this._fields
        ),
      })
    }
  }
}
