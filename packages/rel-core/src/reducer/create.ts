import Property from "../property"
import { ENDPOINTS, CreateMutator, Fields } from "../types"
import { createResolver } from "../resolvers"

const { type } = Property.Fields

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

  const { guard } = _mutator

  return {
    endpoints: {
      [`Create${label}`]: {
        target: ENDPOINTS.MUTATOR,
        params: { input: type(`${label}Input`) },
        guard,
        returns: type(label),
        resolver: makeResolver(label, _mutator, fields),
      },
    },
  }
}
