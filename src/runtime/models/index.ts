import _ from "lodash"
import { uuid, dateTime } from "../../fields"
import { Model, Reducible } from "~/types"

import { generateFields } from "./fields"
// import { generateObjectRelation } from "./relations"
import { Reducer } from "../reducer"

export function modelToRuntime(label, model: Model): Reducible {
  const reducer = new Reducer()
  const { fields, relations } = model

  // const gqlResolver = {}

  const type = {}

  if (fields) {
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
      inputs: {
        [`${label}Input`]: generateFields(restFields),
      },
    })
  }

  if (relations) {
    Object.entries(relations).forEach((relObj) => {
      const [relName, relation] = relObj
      const { to, singular } = relation

      // const [relName, relation] = relObj
      // const { returns, resolver } = generateObjectRelation(relation)
      // type[relName] = returns
      // gqlResolver[relName] = resolver
    })
  }

  reducer.reduce({
    types: {
      [label]: type,
    },
  })

  // Generate Queries and Mutations
  // if (accessors) {
  //   if (accessors.find) {
  //     this.reduce(generateFind(name, accessors.find, fields))
  //   }

  //   if (accessors.list) {
  //     this.reduce(generateList(name, accessors.list, fields))
  //   }
  // }

  // if (mutators) {
  //   this.reduce(generateMutators(name, mutators, fields))
  // }

  return reducer.toReducible()

  // return {
  //   inputs: {
  //     [`${label}Input`]: input,
  //   },
  //   types: {
  //     // [label]: type,
  //     // ...types,
  //     types,
  //   },
  //   resolvers: {
  //     [label]: gqlResolver,
  //   },
  // }
}
