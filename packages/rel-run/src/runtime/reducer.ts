import _ from "lodash"
import {
  Module,
  Reducible,
  Endpoints,
  Guards,
  Outputs,
  Inputs,
} from "@reldb/types"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}
export default class Reducer {
  inputs: Inputs = {}
  outputs: Outputs = {}
  guards: Guards = {}
  endpoints: Endpoints = {}

  module(module: Module) {
    const { schema, guards, endpoints } = module

    if (schema) {
      // Schema needs to be generated from the definition
      Object.entries(schema).forEach((entry) => {
        const [modelName, model] = entry
        model.reduce(this.reduce.bind(this), { modelName })
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
    _.merge(this.outputs, reducible.outputs)
    _.merge(this.endpoints, reducible.endpoints)
  }

  toReducible(): Reducible {
    return {
      inputs: this.inputs,
      outputs: this.outputs,
      endpoints: this.endpoints,
      guards: this.guards,
    }
  }
}
