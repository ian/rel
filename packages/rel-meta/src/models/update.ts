import { uuid, type } from "../fields"
import { UpdateMutator, Fields, Reducible, ENDPOINTS } from "@reldb/types"
import { cypherUpdate } from "@reldb/cypher"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, mutator: UpdateMutator, fields: Fields) {
  return async ({ params }) => {
    const { id, input } = params

    // @todo validation

    const values = await resolveFieldsForUpdate(input)

    // @todo we need to split this logic into a models format
    // ie instead of:
    //   await cypherUpdate(...)
    // it should be:
    //   await models[label].update(...)
    // Models should contain the fields/resolvers -> cypher mapping

    const updated = await cypherUpdate(label, id, values)
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
): Reducible {
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
