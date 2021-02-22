import { Reducer } from "~/reducer"
import { Fields, Accessors } from "~/types"
import { generateFind } from "./find"

export * from "./find"
export * from "./list"

export function generateAccessors(label, accessors: Accessors, fields: Fields) {
  const reducer = new Reducer()

  if (accessors) {
    if (accessors.find) {
      reducer.reduce(generateFind(label, accessors.find /*fields*/))
    }
  }

  // const inputs = {}
  // const mutationTypes = {}
  // const mutationResolvers = {}

  // const generatedFields = generateFields(fields, { guards: false })

  // if (accessors) {
  //   inputs[`${label}Input`] = generatedFields
  // }

  // return {
  //   schema: {
  //     inputs,
  //     types: {
  //       Mutation: mutationTypes,
  //     },
  //   },
  //   resolvers: {
  //     Mutation: mutationResolvers,
  //   },
  // }

  return reducer.toReducible()
}
