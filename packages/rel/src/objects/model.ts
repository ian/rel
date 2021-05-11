import _ from "lodash"
import pluralize from "pluralize"
import {
  Field,
  ModelProperties,
  ModelOptions,
  ModelEndpoints,
  Guard,
  HydrationOpts,
  HydrateableObject,
} from "../types"

import {
  splitProps,
  composeInputProps,
  composeOutputProps,
  composeWhereProps,
} from "../util/props"

import {
  createResolver,
  updateResolver,
  findResolver,
  listResolver,
  deleteResolver,
} from "./resolvers"

import Fields from "../fields"

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
export default class Model implements HydrateableObject {
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

    if (_opts.id) this._autogen.id = Fields.uuid().required() as Field
    if (_opts.timestamps) {
      this._autogen.createdAt = Fields.dateTime().required() as Field
      this._autogen.updatedAt = Fields.dateTime().required() as Field
    }

    this._input = _opts.input
    this._output = _opts.output
    this._props = props
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

  // before() {
  //   // @todo
  //   return this
  // }

  // after() {
  //   // @todo
  //   return this
  // }

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

  hydrate(hydration: HydrationOpts) {
    const { composer } = hydration

    // I don't think props should hydrate
    // Instead, they should provide an interface for filters
    Object.entries({
      ...this._autogen,
      ...this._props,
    }).forEach((entry) => {
      const [propName, prop] = entry
      prop.hydrate(hydration, { obj: this.name, propName })
    })

    const [_fields, _relations] = splitProps(this._props)

    const inputFields = {
      ..._fields,
    }

    const outputFields = {
      ...this._autogen,
      ..._fields,
      // ..._relations,
    }

    // @todo should we just fire off input + output as hydration not composition?
    const input = composer.getOrCreateITC(`${this._name}Input`)
    input.addFields(composeInputProps(inputFields))

    const output = composer.getOrCreateOTC(this._name)
    output.addFields(composeOutputProps(outputFields))

    const whereFields = {
      ...this._autogen,
      ...inputFields,
    }
    const where = composer.getOrCreateITC(`${this._name}Where`)
    where.addFields(composeWhereProps(whereFields))

    if (this._input) {
      if (this._endpoints.create) {
        composer.Mutation.addFields({
          [`Create${this._name}`]: {
            type: this._name,
            args: {
              input: `${this._name}Input!`,
            },
            resolve: createResolver(
              this._name,
              typeof this._endpoints.create === "boolean"
                ? {}
                : this._endpoints.create,
              inputFields
            ),
          },
        })
      }

      if (this._endpoints.update) {
        composer.Mutation.addFields({
          [`Update${this._name}`]: {
            type: this._name,
            args: {
              id: "UUID!",
              input: `${this._name}Input!`,
            },
            resolve: updateResolver(
              this._name,
              typeof this._endpoints.update === "boolean"
                ? {}
                : this._endpoints.update,
              inputFields
            ),
          },
        })
      }

      if (this._endpoints.delete) {
        composer.Mutation.addFields({
          [`Delete${this._name}`]: {
            type: this._name,
            args: {
              id: "UUID!",
            },
            resolve: deleteResolver(
              this._name,
              typeof this._endpoints.delete === "boolean"
                ? {}
                : this._endpoints.delete
            ),
          },
        })
      }
    }

    if (this._output) {
      if (this._endpoints.find) {
        composer.Query.addFields({
          [`Find${this._name}`]: {
            type: this._name,
            args: {
              where: `${this._name}Where!`,
            },
            resolve: findResolver(this._name),
          },
        })
      }

      if (this._endpoints.list) {
        composer.Query.addFields({
          [`List${pluralize(this._name)}`]: {
            type: `[${this._name}]!`,
            args: {
              limit: "Int",
              order: "String",
              skip: "Int",
              where: `${this._name}Where`,
            },
            resolve: listResolver(
              this._name,
              typeof this._endpoints.list === "boolean"
                ? {}
                : this._endpoints.list
            ),
          },
        })
      }
    }
  }
}
