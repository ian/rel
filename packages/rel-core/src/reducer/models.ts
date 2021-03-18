import _ from "lodash"
import Property from "../property"

import { Model, Reducible } from "../types"

import { reduceFields } from "./fields"
import { reduceInput } from "./input"
import { reduceAccessors } from "./accessors"
import { reduceMutators } from "./mutators"
import { reduceRelations } from "./relations"
import { Reducer } from "."

const { uuid, dateTime } = Property.Fields

export function reduceModel(label, model: Model): Reducible {
  const reducer = new Reducer()
  const {
    id,
    timestamps,
    input = true,
    output = true,
    fields,
    relations,
    accessors,
    mutators,
  } = model

  const modelType = {}

  if (id !== false) {
    modelType["id"] = { returns: uuid().required() }
  }

  if (fields) {
    Object.assign(modelType, reduceFields(label, fields))
  }

  if (timestamps !== false) {
    modelType["createdAt"] = { returns: dateTime().required() }
    modelType["updatedAt"] = { returns: dateTime().required() }
  }

  if (input && fields) {
    reducer.reduce({
      inputs: {
        [`${label}Input`]: reduceInput(fields),
      },
    })
  }

  if (output) {
    reducer.reduce({
      outputs: {
        [label]: modelType,
      },
    })
  }

  if (relations) {
    reducer.reduce(reduceRelations(label, relations))
  }

  if (accessors) {
    reducer.reduce(reduceAccessors(label, accessors, fields))
  }

  if (mutators) {
    reducer.reduce(reduceMutators(label, mutators, fields))
  }

  return reducer.toReducible()
}
