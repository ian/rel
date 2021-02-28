import _ from "lodash"
import {
  Module,
  Reducible,
  Endpoints,
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
  // directives: ReducedDirectives = {}
  directives = {}
  endpoints: Endpoints = {}

  module(module: Module) {
    const { schema, directives, endpoints } = module

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach((entry) => {
        const [name, model] = entry
        this.reduce(reduceModel(name, model))
      })
    }

    if (directives) {
      this.reduce({ directives })
    }

    if (endpoints) {
      this.reduce({ endpoints })
    }
  }

  reduce(reducible: Reducible) {
    if (!reducible) return

    if (reducible.directives) {
      const intersect = intersection(this.directives, reducible.directives)
      if (intersect.length > 0)
        throw new Error(
          `Directives currently cannot overwrite eachother, they must be unique. Collision directives: ${intersect.join(
            ", "
          )}`
        )

      _.merge(this.directives, reducible.directives)
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
      directives: this.directives,
    }
  }
}
