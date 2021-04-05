import _ from "lodash"
import { Reduced, FindAccessor, Fields, ENDPOINTS } from "../types"
import { uuid, type } from "../fields"

const DEFAULT_ACCESSOR = {
  findBy: { id: uuid().required() },
}

function makeResolver(label: string, accessor: FindAccessor) {
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
  accessor: boolean | FindAccessor,
  fields: Fields
): Reduced {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const { findBy, guard } = _accessor

  return {
    [`Find${label}`]: {
      target: ENDPOINTS.ACCESSOR,
      params: findBy,
      guard,
      returns: type(label),
      resolver: makeResolver(label, _accessor),
    },
  }
}
