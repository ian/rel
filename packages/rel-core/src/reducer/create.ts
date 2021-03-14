import { type } from "../fields"
import { ENDPOINTS, TypeDef, CreateMutator, Fields } from "../types"
import { createResolver } from "../resolvers"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: CreateMutator, fields: Fields) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return createResolver(label, standardizedOpts, fields)
}

function makeType(label: string, accessor: CreateMutator): TypeDef {
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

  return {
    endpoints: {
      [`Create${label}`]: {
        target: ENDPOINTS.MUTATOR,
        typeDef: makeType(label, _mutator),
        resolver: makeResolver(label, _mutator, fields),
      },
    },
  }
}
