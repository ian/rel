import { Reducer } from "~/reducer"
import { Fields, Mutators, Reducible } from "~/types"
import { generateCreate } from "./create"

// import { createResolver, updateResolver, deleteResolver } from "~/resolvers"
// import { generateFields } from "../models/fields"

// export * from "./create"
// export * from "./update"
// export * from "./delete"

const DEFAULT_MUTATOR = {}

export function generateMutators(
  label,
  mutators: Mutators,
  fields: Fields
): Reducible {
  const reducer = new Reducer()

  if (mutators) {
    if (mutators.create) {
      reducer.reduce(generateCreate(label, mutators.create /*fields*/))
    }
    if (mutators.update) {
      reducer.reduce(generateUpdate(label, mutators.update /*fields*/))
    }
    if (mutators.delete) {
      reducer.reduce(generateDelete(label, mutators.update /*fields*/))
    }
  }

  return reducer.toReducible()

  // const inputs = {}
  // const mutationTypes = {}
  // const mutationResolvers = {}

  // const generatedFields = generateFields(fields, { guards: false })
  //
  // if (mutators) {
  //   inputs[`${label}Input`] = generatedFields

  //   if (mutators.create) {
  //     mutationTypes[`Create${label}(input: ${label}Input!)`] = label
  //     mutationResolvers[`Create${label}`] = createResolver(
  //       label,
  //       fields,
  //       mutators.create === "boolean" ? DEFAULT_MUTATOR : mutators.create
  //     )
  //   }

  //   if (mutators.update) {
  //     mutationTypes[`Update${label}(id: UUID!, input: ${label}Input!)`] = label
  //     mutationResolvers[`Update${label}`] = updateResolver(
  //       label,
  //       fields,
  //       mutators.update === "boolean" ? DEFAULT_MUTATOR : mutators.update
  //     )
  //   }

  //   if (mutators.delete) {
  //     mutationTypes[`Delete${label}(id: UUID!)`] = label
  //     mutationResolvers[`Delete${label}`] = deleteResolver(
  //       label,
  //       mutators.delete === "boolean" ? DEFAULT_MUTATOR : mutators.delete
  //     )
  //   }
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
}
