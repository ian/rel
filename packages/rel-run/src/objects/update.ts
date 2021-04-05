import { uuid, type } from "../fields"
import { UpdateMutator, Fields, Reduced, ENDPOINTS } from "../types"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: UpdateMutator, fields: Fields) {
  return async ({ cypher, params }) => {
    const { id, input } = params

    // @todo validation

    const values = await resolveFieldsForUpdate(input)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherUpdate(...)
    // it should be:
    //   await models[label].update(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const updated = await cypher.update(label, id, values)
    if (mutator.after) {
      await mutator.after(updated)
    }
    return updated
  }
}

async function resolveFieldsForUpdate(input) {
  let values = {}

  for (const inputEntry of Object.entries(input)) {
    const [fieldName, inputValue] = inputEntry
    values[fieldName] = inputValue
  }

  return values
}

export function updateEndpoints(
  label: string,
  mutator: boolean | UpdateMutator,
  fields: Fields
): Reduced {
  if (!mutator) return null

  let _mutator = {
    ...DEFAULT_MUTATOR,
    ...(typeof mutator === "boolean" ? {} : mutator),
  }

  const { guard } = _mutator

  return {
    [`Update${label}`]: {
      target: ENDPOINTS.MUTATOR,

      guard,
      params: {
        id: uuid().required(),
        input: type(`${label}Input`).required(),
      },
      returns: type(label),

      resolver: makeResolver(label, _mutator, fields),
    },
  }
}
