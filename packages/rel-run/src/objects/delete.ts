import { type, uuid } from "../fields"
import { DeleteMutator, ENDPOINTS, Fields, Reduced } from "../types"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: DeleteMutator) {
  return async ({ cypher, params }) => {
    const { id } = params

    const updated = await cypher.delete(label, id)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  }
}

export function deleteEndpoints(
  label: string,
  mutator: boolean | DeleteMutator,
  fields: Fields
): Reduced {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const { guard } = _mutator

  return {
    [`Delete${label}`]: {
      target: ENDPOINTS.MUTATOR,
      params: { id: uuid().required() },
      guard,
      returns: type(label),
      resolver: makeResolver(label, _mutator),
    },
  }
}