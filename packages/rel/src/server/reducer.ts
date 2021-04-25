import _ from "lodash"
import {
  Reducer,
  Reduced,
  ReducibleDirective,
  ReducibleDirectives,
  ReducibleInput,
  ReducibleInputs,
  ReducibleOutput,
  ReducibleOutputs,
  ReducedGraphQLEndpoint,
  ReducedHTTPEndpoint,
} from "../types"

export function intersection(o1, o2) {
  return Object.keys(o1).filter({}.hasOwnProperty.bind(o2))
}

export default class ReducerImpl implements Reducer {
  _inputs: { [name: string]: ReducibleInput } = {}
  _outputs: { [name: string]: ReducibleOutput } = {}
  _directives: { [name: string]: ReducibleDirective } = {}
  _graphqlEndpoints?: ReducedGraphQLEndpoint[] = []
  _httpEndpoints?: ReducedHTTPEndpoint[] = []

  directives(directives: ReducibleDirectives) {
    const intersect = intersection(this._directives, directives)

    if (intersect.length > 0)
      throw new Error(
        `Guards currently cannot overwrite eachother, they must be unique. Collision guards: ${intersect.join(
          ", "
        )}`
      )

    _.merge(this._directives, directives)
  }

  inputs(inputs: ReducibleInputs) {
    _.merge(this._inputs, inputs)
  }

  outputs(outputs: ReducibleOutputs) {
    _.merge(this._outputs, outputs)
  }

  graphqlEndpoints(graphql: ReducedGraphQLEndpoint[]) {
    graphql.forEach((e) => this._graphqlEndpoints.push(e))
  }

  httpEndpoints(http: ReducedHTTPEndpoint[]) {
    http.forEach((e) => this._httpEndpoints.push(e))
  }

  reduced(): Reduced {
    return {
      inputs: this._inputs,
      outputs: this._outputs,
      graphqlEndpoints: this._graphqlEndpoints,
      httpEndpoints: this._httpEndpoints,
      directives: this._directives,
    }
  }
}
