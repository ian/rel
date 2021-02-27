import _ from "lodash"
import {
  Reducible,
  ReducedTypes,
  ReducedResolvers,
  ReducedDirectives,
} from "~/types"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}

export class Reducer {
  inputs: ReducedTypes = {}
  types: ReducedTypes = {}
  resolvers: ReducedResolvers = {}
  directives: ReducedDirectives = {}

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
    _.merge(this.resolvers, reducible.resolvers)
  }

  toReducible(): Reducible {
    return {
      inputs: this.inputs,
      types: this.types,
      resolvers: this.resolvers,
      directives: this.directives,
    }
  }
}
