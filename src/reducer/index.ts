import _ from "lodash"
import { Reducible, ReducedTypes } from "~/types"

export class Reducer {
  inputs: ReducedTypes = {}
  types: ReducedTypes = {}
  resolvers: ReducedTypes = {}
  directives: ReducedTypes = {}

  reduce(reducible: Reducible) {
    if (!reducible) return

    _.merge(this.inputs, reducible.inputs)
    _.merge(this.types, reducible.types)
    _.merge(this.resolvers, reducible.resolvers)
    _.merge(this.directives, reducible.directives)
  }

  toReducible(): Reducible {
    return {
      inputs: this.inputs,
      types: this.types,
    }
  }
}
