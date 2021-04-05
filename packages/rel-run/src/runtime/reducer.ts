import _ from "lodash"
import { Reduced, Endpoints, Guards, Outputs, Inputs } from "../types"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}
export default class Reducer {
  inputs: Inputs = {}
  outputs: Outputs = {}
  guards: Guards = {}
  endpoints: Endpoints = {}

  constructor() {
    this.reduce = this.reduce.bind(this)
  }

  reduce(reduced: Reduced) {
    if (!reduced) return

    if (reduced.schema) {
      Object.entries(reduced.schema).forEach((entry) => {
        const [modelName, model] = entry
        model.reduce(this.reduce, { modelName })
      })
    }

    if (reduced.guards) {
      const intersect = intersection(this.guards, reduced.guards)
      if (intersect.length > 0)
        throw new Error(
          `Guards currently cannot overwrite eachother, they must be unique. Collision guards: ${intersect.join(
            ", "
          )}`
        )

      _.merge(this.guards, reduced.guards)
    }

    _.merge(this.inputs, reduced.inputs)
    _.merge(this.outputs, reduced.outputs)
    _.merge(this.endpoints, reduced.endpoints)
  }

  toReducible(): Reduced {
    return {
      inputs: this.inputs,
      outputs: this.outputs,
      endpoints: this.endpoints,
      guards: this.guards,
    }
  }
}
