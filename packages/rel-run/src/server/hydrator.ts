import _ from "lodash"
import {
  Reduced,
  GraphQLEndpoint,
  HTTPEndpoint,
  Guards,
  Schema,
} from "../types"
import Rel from "../index"
import Reducer from "./reducer"

export default class Hydrator {
  reducer: Reducer

  constructor() {
    this.reducer = new Reducer()
    this.endpoints([
      Rel.query("PingQuery", Rel.string().required()).resolver(() =>
        new Date().toISOString()
      ),
      Rel.mutation("PingMutation", Rel.string().required()).resolver(() =>
        new Date().toISOString()
      ),
    ])
  }

  schema(schema: Schema): Hydrator {
    Object.entries(schema).forEach((entry) => {
      const [modelName, model] = entry
      model.reduce(this.reducer, { modelName })
    })

    return this
  }

  endpoints(
    endpoints:
      | GraphQLEndpoint
      | HTTPEndpoint
      | (GraphQLEndpoint | HTTPEndpoint)[]
  ): Hydrator {
    Array(endpoints)
      .flat()
      .forEach((endpoint) => {
        endpoint.reduce(this.reducer)
      })
    return this
  }

  guards(guards: Guards): Hydrator {
    this.reducer.reduce({ guards })

    return this
  }

  reduced(): Reduced {
    return this.reducer.reduced()
  }
}
