import { uuid, type } from "../../../fields"
import {
  TypeDef,
  UpdateMutator,
  Fields,
  Reducible,
  ENDPOINTS,
} from "../../../types"
import { updateResolver } from "../../../resolvers"

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

function makeType(label: string, accessor: UpdateMutator): TypeDef {
  const { guard } = accessor

  return {
    params: { id: uuid(), input: type(`${label}Input`) },
    guard,
    returns: type(label),
  }
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

  return {
    endpoints: {
      [`Update${label}`]: {
        type: ENDPOINTS.MUTATOR,
        typeDef: makeType(label, _mutator),
        resolver: makeResolver(label, _mutator, fields),
      },
    },
  }
}
