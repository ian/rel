import _ from "lodash"
import { printSchema } from "graphql/utilities"
import { formatSdl } from "format-graphql"

import {
  Input,
  Output,
  Guard,
  Plugin,
  Model,
  Endpoint,
  Hydrator,
} from "../types"

import Rel, { Fields } from "../index"
import { SchemaComposer } from "graphql-compose"

const SCALARS = [
  "Boolean",
  "DateTime",
  "Float",
  "Geo",
  "Int",
  "PhoneNumber",
  "String",
  "UUID",
]
export default class HydratorInstance implements Hydrator {
  schemaComposer = new SchemaComposer()

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

    SCALARS.forEach((scalar) =>
      this.schemaComposer.createScalarTC(`scalar ${scalar}`)
    )
  }

  auth(...strategies: Plugin[]) {
    Array(strategies)
      .flat()
      .forEach((plugin) => {
        plugin({
          hydrator: this,
          composer: this.schemaComposer,
        })
      })
    return this
  }

  schema(...models: Model[]) {
    models.forEach((model) => {
      // if (!model.hydrate) {
      //   throw new Error(
      //     "server.schema() was sent that does not respond to hydrate() " +
      //       JSON.stringify(model)
      //   )
      // }

      model.hydrate({
        hydrator: this,
        composer: this.schemaComposer,
      })
    })
  }

  plugins(...plugins: Plugin[]) {
    Array(plugins)
      .flat()
      .forEach((plugin) => {
        plugin({
          hydrator: this,
          composer: this.schemaComposer,
        })
      })
  }

  inputs(...inputs: Input[]) {
    inputs.forEach((input) => {
      input.hydrate({
        hydrator: this,
        composer: this.schemaComposer,
      })
    })
  }

  outputs(...outputs: Output[]) {
    outputs.forEach((output) => {
      output.hydrate({
        hydrator: this,
        composer: this.schemaComposer,
      })
    })
  }

  endpoints(...endpoints: Endpoint[]) {
    endpoints.forEach((e) =>
      e.hydrate({
        hydrator: this,
        composer: this.schemaComposer,
      })
    )
  }

  // IH: Unsure if we want to support this
  // directives(...directives: Guard[]) {
  //   directives.forEach((g) => this._directives.push(g))
  // }

  runtime() {
    const schema = this.schemaComposer.buildSchema({
      keepUnusedTypes: true,
    })

    const typeDefs = formatSdl(printSchema(schema), {
      sortDefinitions: false,
      sortFields: false,
    })

    return {
      typeDefs,
      schema,
    }
  }
}
