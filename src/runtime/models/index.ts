import _ from "lodash"
import { type, array, uuid, dateTime } from "../../fields"
import { Model, Reducible } from "~/types"

import { generateFields } from "./fields"
// import { generateObjectRelation } from "./relations"
import { generateAccessors } from "./accessors"
import { relationResolver } from "../../resolvers"
import { Reducer } from "../../reducer"

export function modelToRuntime(label, model: Model): Reducible {
  const reducer = new Reducer()
  const { id, timestamps, fields, relations, accessors /* mutators */ } = model

  const modelType = {}

  if (id !== false) {
    modelType["id"] = { returns: uuid() }
  }

  if (fields) {
    Object.assign(modelType, generateFields(fields))
  }

  if (timestamps !== false) {
    modelType["createdAt"] = { returns: dateTime() }
    modelType["updatedAt"] = { returns: dateTime() }
  }

  reducer.reduce({
    types: {
      [label]: modelType,
    },
  })

  if (fields) {
    reducer.reduce({
      inputs: {
        [`${label}Input`]: generateFields(fields),
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
              // returns: `${singular ? to.label : `[${to.label}]!`}`,
              returns: singular
                ? type(to.label)
                : array(type(to.label)).required(),
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

  // if (mutators) {
  //   this.reduce(generateMutators(name, mutators, fields))
  // }

  return reducer.toReducible()
}
