import { Fields, Accessors } from "~/types"

export * from "./find"
export * from "./list"

export function generateAccessors(label, accessors: Accessors, fields: Fields) {
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

  return {}
}
