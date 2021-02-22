import _ from "lodash"
import { uuid, dateTime } from "../../fields"
import { Model, Reducible } from "~/types"

import { generateFields } from "./fields"
// import { generateObjectRelation } from "./relations"
import { generateAccessors } from "./accessors"
import { relationResolver } from "../../resolvers"
import { Reducer } from "../../reducer"

export function modelToRuntime(label, model: Model): Reducible {
  const reducer = new Reducer()
  const { fields, relations, accessors /* mutators */ } = model

  if (fields) {
    const type = {}
    const { id, timestamps, ...restFields } = fields

    if (id !== false) {
      type["id"] = { returns: uuid() }
    }

    Object.assign(type, generateFields(restFields))

    if (timestamps !== false) {
      type["createdAt"] = { returns: dateTime() }
      type["updatedAt"] = { returns: dateTime() }
    }

    reducer.reduce({
      types: {
        [label]: type,
      },
    })

    reducer.reduce({
      inputs: {
        [`${label}Input`]: generateFields(restFields),
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
              returns: `${singular ? to.label : `[${to.label}]!`}`,
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
