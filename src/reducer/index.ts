import _ from "lodash"
import {
  Module,
  Reducible,
  Endpoints,
  ReducedGuards,
  ReducedTypes,
  ReducedInputs,
} from "~/types"

import { reduceModel } from "./models"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}

export class Reducer {
  inputs: ReducedInputs = {}
  types: ReducedTypes = {}
  guards: ReducedGuards = {}
  endpoints: Endpoints = {}

  module(module: Module) {
    const { schema, guards, endpoints } = module

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach((entry) => {
        const [name, model] = entry
        this.reduce(reduceModel(name, model))
      })
    }

    if (guards) {
      this.reduce({ guards })
    }

    if (endpoints) {
      this.reduce({ endpoints })
    }
  }

  reduce(reducible: Reducible) {
    if (!reducible) return

    if (reducible.guards) {
      const intersect = intersection(this.guards, reducible.guards)
      if (intersect.length > 0)
        throw new Error(
          `Guards currently cannot overwrite eachother, they must be unique. Collision guards: ${intersect.join(
            ", "
          )}`
        )

      _.merge(this.guards, reducible.guards)
    }

    _.merge(this.inputs, reducible.inputs)
    _.merge(this.types, reducible.types)
    _.merge(this.endpoints, reducible.endpoints)
  }

  toReducible(): Reducible {
    return {
      inputs: this.inputs,
      types: this.types,
      endpoints: this.endpoints,
      guards: this.guards,
    }
  }
}
