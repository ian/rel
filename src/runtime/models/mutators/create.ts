import { string, type } from "~/fields"
import { CreateMutator, Fields, ReducedField, ReducedType } from "~/types"
import { createResolver } from "~/resolvers"

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

function makeInput(
  label: string,
  accessor: CreateMutator,
  fields: Fields
): ReducedType {
  const { guard } = accessor

  const reduced = Object.entries(fields).reduce((acc, entry) => {
    const [fieldName, field] = entry
    acc[fieldName] = {
      returns: field,
    }
    return acc
  }, {})

  return reduced
}

function makeType(label: string, accessor: CreateMutator): ReducedField {
  const { guard } = accessor

  return {
    params: { input: type(`${label}Input`) },
    guard,
    returns: type(label),
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
      [inputName]: makeInput(label, _mutator, fields),
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
