import pluralize from "pluralize"
import { int, array, type, string } from "../fields"
import { ListAccessor, Reduced, ENDPOINTS, Fields } from "../types"

const DEFAULT_ACCESSOR = {}

function makeResolver(label: string, accessor: ListAccessor) {
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
  accessor: boolean | ListAccessor,
  fields: Fields
): Reduced {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const { guard } = _accessor

  return {
    [`List${pluralize(label)}`]: {
      target: ENDPOINTS.ACCESSOR,
      params: { limit: int(), skip: int(), order: string() },
      guard,
      returns: array(type(label)).required(),
      resolver: makeResolver(label, _accessor),
    },
  }
}