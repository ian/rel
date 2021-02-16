import { Fields, Mutators } from "../types"
import { createResolver, updateResolver } from "../../resolvers"
import { generateFields } from "../models/fields"

// export * from "./create"
// export * from "./update"
// export * from "./delete"

const DEFAULT_MUTATOR = {}

export function generateMutators(label, mutators: Mutators, fields: Fields) {
  const inputs = {}
  const mutationTypes = {}
  const mutationResolvers = {}

  const generatedFields = generateFields(fields, { guards: false })

  if (mutators) {
    inputs[`${label}Input`] = generatedFields

    if (mutators.create) {
      mutationTypes[`Create${label}(input: ${label}Input!)`] = label
      mutationResolvers[`Create${label}`] = createResolver(
        label,
        fields,
        mutators.create === "boolean" ? DEFAULT_MUTATOR : mutators.create
      )
    }

    if (mutators.update) {
      // this.reduce(generateUpdate(name, mutators.update, fields))
      mutationTypes[`Update${label}(id: UUID!, input: ${label}Input!)`] = label
      mutationResolvers[`Update${label}`] = updateResolver(
        label,
        fields,
        mutators.create === "boolean" ? DEFAULT_MUTATOR : mutators.create
      )
    }

    if (mutators.delete) {
      // this.reduce(generateDelete(name, mutators.delete, fields))
    }
  }

  return {
    schema: {
      inputs,
      types: {
        Mutation: mutationTypes,
      },
    },
    resolvers: {
      Mutation: mutationResolvers,
    },
  }
}
