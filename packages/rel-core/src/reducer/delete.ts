import Property from "../property"
import { DeleteMutator, ENDPOINTS, Fields, Reducible } from "../types"
import { deleteResolver } from "../resolvers"

const DEFAULT_MUTATOR = {}
const { type, uuid } = Property.Fields

function makeResolver(label: string, mutator: DeleteMutator) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    mutator
  )

  return deleteResolver(label, standardizedOpts)
}

export function generateDelete(
  label: string,
  mutator: boolean | DeleteMutator,
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
      [`Delete${label}`]: {
        target: ENDPOINTS.MUTATOR,
        params: { id: uuid() },
        guard,
        returns: type(label),
        resolver: makeResolver(label, _mutator),
      },
    },
  }
}
