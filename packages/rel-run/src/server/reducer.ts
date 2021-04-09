import _ from "lodash"
import {
  Reducible,
  Reduced,
  Guards,
  ReducedInput,
  ReducedOutput,
  ReducedGQLEndpoint,
  ReducedHTTPEndpoint,
} from "../types"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}

export default class Reducer {
  _inputs: { [name: string]: ReducedInput } = {}
  _outputs: { [name: string]: ReducedOutput } = {}
  _guards: Guards = {}
  _graphQLEndpoints?: ReducedGQLEndpoint[] = []
  _httpEndpoints?: ReducedHTTPEndpoint[] = []

  reduce(reduced: Reducible) {
    if (!reduced) return

    if (reduced.guards) {
      const intersect = intersection(this._guards, reduced.guards)
      if (intersect.length > 0)
        throw new Error(
          `Guards currently cannot overwrite eachother, they must be unique. Collision guards: ${intersect.join(
            ", "
          )}`
        )

      _.merge(this._guards, reduced.guards)
    }

    _.merge(this._inputs, reduced.inputs)
    _.merge(this._outputs, reduced.outputs)

    if (reduced.graphQLEndpoints)
      Array(reduced.graphQLEndpoints)
        .flat()
        .forEach((e) => this._graphQLEndpoints.push(e))

    if (reduced.httpEndpoints)
      Array(reduced.httpEndpoints)
        .flat()
        .forEach((e) => this._httpEndpoints.push(e))
  }

  reduced(): Reduced {
    return {
      inputs: this._inputs,
      outputs: this._outputs,
      graphQLEndpoints: this._graphQLEndpoints,
      httpEndpoints: this._httpEndpoints,
      guards: this._guards,
    }
  }
}
