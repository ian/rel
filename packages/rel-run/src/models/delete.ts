import { ref, uuid } from "../fields"
import {
  ModelEndpointsDeleteOpts,
  Fields,
  GraphQLOperationType,
  ReducedGQLEndpoint,
} from "../types"

const DEFAULT_MUTATOR = {}

function makeResolver(label: string, endpoint: ModelEndpointsDeleteOpts) {
  return async ({ cypher, params }) => {
    const { id } = params

    const updated = await cypher.delete(label, id)
    if (endpoint.after) {
      await endpoint.after(updated)
    }
    return updated
  }
}

export function deleteEndpoints(
  label: string,
  endpoint: boolean | ModelEndpointsDeleteOpts,
  fields: Fields
): ReducedGQLEndpoint {
  if (!endpoint) return null

  let _endpoint = {
    ...DEFAULT_MUTATOR,
    ...(typeof endpoint === "boolean" ? {} : endpoint),
  }

  const { guard } = _endpoint

  return {
    label: `Delete${label}`,
    type: GraphQLOperationType.MUTATION,
    params: { id: uuid().required() },
    guard,
    returns: ref(label),
    resolver: makeResolver(label, _endpoint),
  }
}
