import _ from "lodash"
import {
  ModelEndpointsFindOpts,
  Fields,
  GraphQLOperationType,
  ReducedGQLEndpoint,
} from "../types"
import { uuid, ref } from "../fields"

const DEFAULT_ACCESSOR = {
  findBy: { id: uuid().required() },
}

function makeResolver(label: string, endpoint: ModelEndpointsFindOpts) {
  return async (runtime) => {
    const { cypher, params } = runtime

    // @todo allow more findBy types
    // const findParamName = findBy
    //   .map((f, i) => (i === 0 ? f : titleize(f)))
    //   .join("Or")
    return cypher.find(label, params.id)
  }
}

export function findEndpoints(
  label,
  endpoint: boolean | ModelEndpointsFindOpts,
  fields: Fields
): ReducedGQLEndpoint {
  if (!endpoint) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof endpoint === "boolean" ? {} : endpoint),
  }

  const { findBy, guard } = _accessor

  return {
    label: `Find${label}`,
    type: GraphQLOperationType.QUERY,
    params: findBy,
    guard,
    returns: ref(label),
    resolver: makeResolver(label, _accessor),
  }
}
