import _ from "lodash"
import { type, array, uuid, dateTime } from "../../fields"
import { Model, Reducible } from "~/types"

import { reduceFields } from "./fields"
import { reduceInput } from "./input"
import { reduceAccessors } from "./accessors"
import { reduceMutators } from "./mutators"
import { reduceRelations } from "./relations"
import { Reducer } from ".."

export function reduceModel(label, model: Model): Reducible {
  const reducer = new Reducer()
  const {
    id,
    timestamps,
    input = true,
    fields,
    relations,
    accessors,
    mutators,
  } = model

  const modelType = {}

  if (id !== false) {
    modelType["id"] = { typeDef: { returns: uuid().required() } }
  }

  if (fields) {
    Object.assign(modelType, reduceFields(fields))
  }

  if (timestamps !== false) {
    modelType["createdAt"] = { typeDef: { returns: dateTime().required() } }
    modelType["updatedAt"] = { typeDef: { returns: dateTime().required() } }
  }

  reducer.reduce({
    types: {
      [label]: modelType,
    },
  })

  if (input && fields) {
    reducer.reduce({
      inputs: {
        [`${label}Input`]: reduceInput(fields),
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
