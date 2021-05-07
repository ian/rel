import _ from "lodash"
import {
  Field,
  Model,
  ModelProperties,
  ModelOptions,
  ModelEndpoints,
  Guard,
} from "../types"

import Rel from "../meta"

// import endpointHydrator from "./reducer"
import {
  hydrateFind,
  hydrateList,
  hydrateCreate,
  hydrateUpdate,
  hydrateDelete,
} from "../hydration"

import { splitProps, duplicateProps } from "../util/props"
import { Hydrator } from "../server"

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
export default class ModelImpl implements Model {
  _name: string
  _input: boolean
  _output: boolean
  _guard: Guard = null

  _autogen: { id?: Field; createdAt?: Field; updatedAt?: Field } = {}
  _props: ModelProperties = {}
  _endpoints: ModelEndpoints = {}

  constructor(name: string, props: ModelProperties, opts?: ModelOptions) {
    const _opts = {
      ...DEFAULT_OPTS,
      ...opts,
    }

    this._name = name

    if (_opts.id) this._autogen.id = Rel.uuid().required() as Field
    if (_opts.timestamps) {
      this._autogen.createdAt = Rel.dateTime().required() as Field
      this._autogen.updatedAt = Rel.dateTime().required() as Field
    }

    this._input = _opts.input
    this._output = _opts.output
    this._props = props

    // this.endpoints(true)
  }

  get name() {
    return this._name
  }

  get props() {
    return this._props
  }

  guard(scope: Guard) {
    this._guard = scope
    return this
  }

  before() {
    // @todo
    return this
  }

  after() {
    // @todo
    return this
  }

  endpoints(endpoints: ModelEndpoints | boolean) {
    if (endpoints === false) {
      return this
    } else if (!endpoints || endpoints === true) {
      this._endpoints = DEFAULT_CRUD
    } else {
      Object.assign(this._endpoints, endpoints)
    }

    return this
  }

  hydrate(hydrator: Hydrator) {
    const [_fields, _relations] = splitProps(this._props)

    const inputFields = {
      ..._fields,
    }

    const outputFields = {
      ...this._autogen,
      ..._fields,
      // ..._relations,
    }

    // add our where input
    const whereFields = {
      ...this._autogen,
      ...inputFields,
    }
    const where = duplicateProps(whereFields)
    hydrator.inputs(Rel.input(`${this._name}Where`, where))

    if (this._input) {
      const input = Rel.input(`${this._name}Input`, inputFields).guard(
        this._guard
      )

      hydrator.inputs(input)

      if (this._endpoints.create) {
        hydrateCreate(this._name, this._endpoints.create, input)(hydrator)
      }

      if (this._endpoints.update) {
        hydrateUpdate(this._name, this._endpoints.update, input)(hydrator)
      }

      if (this._endpoints.delete) {
        hydrateDelete(this._name, this._endpoints.delete)(hydrator)
      }
    }

    if (this._output) {
      hydrator.outputs(Rel.output(this._name, outputFields).guard(this._guard))

      if (this._endpoints.find) {
        hydrateFind(this._name, this._endpoints.find, _fields)(hydrator)
      }

      if (this._endpoints.list) {
        hydrateList(this._name, this._endpoints.list, _fields)(hydrator)
      }

      Object.entries(outputFields).forEach((entry) => {
        const [propName, prop] = entry
        prop.hydrate(hydrator, { obj: this.name, propName })
      })

      Object.entries(_relations).forEach((entry) => {
        const [propName, prop] = entry
        prop.hydrate(hydrator, { obj: this.name, propName })
      })
    }
  }
}
