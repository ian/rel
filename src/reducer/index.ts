import _ from "lodash"
import { Reducible, ReducedTypes } from "~/types"

export class Reducer {
  inputs: ReducedTypes = {}
  types: ReducedTypes = {}

  reduce(reducible: Reducible) {
    if (!reducible) return

    _.merge(this.inputs, reducible.inputs)
    _.merge(this.types, reducible.types)
    // _.merge(this.resolvers, module.resolvers)
    // _.merge(this.directives, module.directives)
  }

  toReducible(): Reducible {
    return {
      inputs: this.inputs,
      types: this.types,
    }
  }
}
