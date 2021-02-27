import _ from "lodash"
import { type, array, uuid, dateTime } from "../../fields"
import { Model, Reducible } from "~/types"

import { generateFields } from "./fields"
import { generateInput } from "./input"
// import { generateObjectRelation } from "./relations"
import { generateAccessors } from "./accessors"
import { generateMutators } from "./mutators"
import { relationResolver } from "../../resolvers"
import { Reducer } from "../reducer"

export function modelToRuntime(label, model: Model): Reducible {
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
    Object.assign(modelType, generateFields(fields))
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
        [`${label}Input`]: generateInput(fields),
      },
    })
  }

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const [relName, relation] = relObj
      const { to, singular } = relation

      reducer.reduce({
        types: {
          [label]: {
            [relName]: {
              typeDef: {
                returns: singular
                  ? type(to.label)
                  : array(type(to.label)).required(),
              },
            },
          },
        },
      })

      reducer.reduce({
        resolvers: {
          [label]: {
            [relName]: relationResolver(relation),
          },
        },
      })
    })
  }

  if (accessors) {
    reducer.reduce(generateAccessors(label, accessors, fields))
  }

  if (mutators) {
    reducer.reduce(generateMutators(label, mutators, fields))
  }

  return reducer.toReducible()
}
