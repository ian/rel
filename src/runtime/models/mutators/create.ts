import { type } from "~/fields"
import { CreateMutator, Fields, ReducedField } from "~/types"
import { createResolver } from "~/resolvers"
import { generateInput } from "../input"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: CreateMutator) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return createResolver(label, standardizedOpts)
}

function makeType(label: string, accessor: CreateMutator): ReducedField {
  const { guard } = accessor

  return {
    typeDef: {
      params: { input: type(`${label}Input`) },
      guard,
      returns: type(label),
    },
  }
}

export function generateCreate(
  label: string,
  mutator: boolean | CreateMutator,
  fields: Fields
) {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const mutationName = `Create${label}`
  const inputName = `${label}Input`

  return {
    inputs: {
      [inputName]: generateInput(fields),
    },
    types: {
      Mutation: {
        [mutationName]: makeType(label, _mutator),
      },
    },
    resolvers: {
      Mutation: {
        [mutationName]: makeResolver(label, _mutator),
      },
    },
  }
}
