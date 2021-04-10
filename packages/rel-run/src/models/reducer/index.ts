import pluralize from "pluralize"
import _ from "lodash"
import { ModelEndpoints, Fields, Reducer } from "../../types"

import reducedFind from "./find"
import reducedList from "./list"
import reducedCreate from "./create"
import reducedUpdate from "./update"
import reducedDelete from "./delete"

export default function endpointReducer(
  modelName: string,
  endpoints: ModelEndpoints,
  fields: Fields
) {
  return (reducer: Reducer) => {
    if (endpoints.find || endpoints.list) {
      // add our where input
      const where = convertToWhere(fields)
      reducer.reduce({
        inputs: {
          [`_${modelName}Where`]: where,
        },
      })
    }

    if (endpoints.find) {
      reducer.reduce(reducedFind(modelName, endpoints.find, fields))
    }

    if (endpoints.list) {
      reducer.reduce(reducedList(modelName, endpoints.list, fields))
    }

    if (endpoints.create) {
      reducer.reduce(reducedCreate(modelName, endpoints.create, fields))
    }

    if (endpoints.update) {
      reducer.reduce(reducedUpdate(modelName, endpoints.update, fields))
    }

    if (endpoints.delete) {
      reducer.reduce(reducedDelete(modelName, endpoints.delete, fields))
    }
  }
}

function convertToWhere(fields: Fields) {
  return Object.entries(fields).reduce((acc, entry) => {
    const [name, field] = entry
    const clone = Object.assign({}, field)
    Object.setPrototypeOf(clone, Object.getPrototypeOf(field))
    acc[name] = clone.required(false)
    return acc
  }, {})
}
