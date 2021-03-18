import Property from "../property"
import { UpdateMutator, Fields, Reducible, ENDPOINTS } from "../types"
import { updateResolver } from "../resolvers"

const { uuid, type } = Property.Fields

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: UpdateMutator, fields: Fields) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return updateResolver(label, standardizedOpts, fields)
}

export function generateUpdate(
  label: string,
  mutator: boolean | UpdateMutator,
  fields: Fields
): Reducible {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const { guard } = _mutator

  return {
    endpoints: {
      [`Update${label}`]: {
        target: ENDPOINTS.MUTATOR,

        guard,
        params: { id: uuid(), input: type(`${label}Input`) },
        returns: type(label),

        resolver: makeResolver(label, _mutator, fields),
      },
    },
  }
}
