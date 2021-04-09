import pluralize from "pluralize"
import { int, array, ref, string } from "../fields"
import {
  ModelEndpointsListOpts,
  Fields,
  GraphQLOperationType,
  ReducedGQLEndpoint,
} from "../types"

const DEFAULT_ACCESSOR = {}

function makeResolver(label: string, endpoint: ModelEndpointsListOpts) {
  return async (runtime) => {
    const { cypher, params } = runtime
    const { limit, skip = 0, order = "id" } = params
    const {
      // boundingBox,
      filter,
    } = params

    return cypher.list(label, { limit, skip, order })
  }
}

export function listEndpoints(
  label: string,
  endpoint: boolean | ModelEndpointsListOpts,
  fields: Fields
): ReducedGQLEndpoint {
  if (!endpoint) return null

  let _endpoint = {
    ...DEFAULT_ACCESSOR,
    ...(typeof endpoint === "boolean" ? {} : endpoint),
  }

  const { guard } = _endpoint

  return {
    label: `List${pluralize(label)}`,
    type: GraphQLOperationType.QUERY,
    params: { limit: int(), skip: int(), order: string() },
    guard,
    returns: array(ref(label)).required(),
    resolver: makeResolver(label, _endpoint),
  }
}
