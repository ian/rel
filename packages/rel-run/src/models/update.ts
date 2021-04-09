import { uuid, ref } from "../fields"
import {
  ModelEndpointsUpdateOpts,
  Fields,
  ReducedGQLEndpoint,
  GraphQLOperationType,
} from "../types"

const DEFAULT_MUTATOR = {}

function makeResolver(
  label: string,
  endpoint: ModelEndpointsUpdateOpts,
  fields: Fields
) {
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
    if (endpoint.after) {
      await endpoint.after(updated)
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
  endpoint: boolean | ModelEndpointsUpdateOpts,
  fields: Fields
): ReducedGQLEndpoint {
  if (!endpoint) return null

  let _endpoint = {
    ...DEFAULT_MUTATOR,
    ...(typeof endpoint === "boolean" ? {} : endpoint),
  }

  const { guard } = _endpoint

  return {
    label: `Update${label}`,
    type: GraphQLOperationType.MUTATION,
    guard,
    params: {
      id: uuid().required(),
      input: ref(`${label}Input`).required(),
    },
    returns: ref(label),

    resolver: makeResolver(label, _endpoint, fields),
  }
}
