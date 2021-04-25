import _ from "lodash"
import {
  ReducedGraphQLEndpoint,
  ReducedHTTPEndpoint,
  Input,
  Output,
  Guard,
  Plugin,
  Model,
  Endpoint,
  Hydrator,
  EndpointType,
} from "../types"

import Rel from "../index"
import Reducer from "./reducer"

export default class HydratorInstance implements Hydrator {
  _inputs: {
    [inputName: string]: Input[]
  } = {}

  _outputs: {
    [outputName: string]: Output[]
  } = {}

  _endpoints: Endpoint[] = []
  _guards: Guard[] = []

  constructor() {
    this.endpoints(
      Rel.query("PingQuery", Rel.string().required(), () =>
        new Date().toISOString()
      ),
      Rel.mutation("PingMutation", Rel.string().required(), () =>
        new Date().toISOString()
      )
    )
  }

  schema(...models: Model[]) {
    models.forEach((model) => {
      if (!model.hydrate) {
        throw new Error(
          "Model was sent that does not respond to hydrate() " +
            JSON.stringify(model)
        )
      }

      model.hydrate(this)
    })
    return this
  }

  plugins(...plugins: Plugin[]) {
    Array(plugins)
      .flat()
      .forEach((plugin) => {
        plugin(this)
      })
    return this
  }

  inputs(...inputs: Input[]) {
    inputs.forEach((input) => {
      this._inputs[input.name] ||= []
      this._inputs[input.name].push(input)
    })
  }

  outputs(...outputs: Output[]) {
    outputs.forEach((output) => {
      this._outputs[output.name] ||= []
      this._outputs[output.name].push(output)
    })
  }

  endpoints(...endpoints: Endpoint[]) {
    endpoints.forEach((e) => this._endpoints.push(e))
  }

  guards(...guards: Guard[]) {
    guards.forEach((g) => this._guards.push(g))
  }

  reduce() {
    const reducer = new Reducer()

    Object.entries(this._inputs).forEach(([name, inputs]) => {
      inputs.forEach((input) => {
        const reduced = input.reduce()

        reducer.inputs({
          [name]: reduced,
        })
      })
    })

    Object.entries(this._outputs).forEach(([name, outputs]) => {
      outputs.forEach((output) => {
        const reduced = output.reduce()
        reducer.outputs({
          [name]: reduced,
        })
      })
    })

    this._endpoints.forEach((e) => {
      const reduced = e.reduce()

      switch (e.type) {
        case EndpointType.GRAPHQL:
          reducer.graphqlEndpoints([reduced as ReducedGraphQLEndpoint])
          break
        case EndpointType.HTTP:
          reducer.httpEndpoints([reduced as ReducedHTTPEndpoint])
          break
        default:
          throw new Error(`Unknown Endpoint type in reduction: ${e.type}`)
      }
    })

    this._guards.forEach((guard) => {
      reducer.directives({
        [guard.name]: guard.reduce(),
      })
    })

    // @todo - iterate over the hydration schema and reduce
    return reducer.reduced()
  }
}
