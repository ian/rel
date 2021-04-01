import _ from "lodash"
import { Reducible, FindAccessor, Fields, ENDPOINTS } from "@reldb/types"
import { uuid, type } from "../fields"
import { cypherFind } from "@reldb/cypher"

const DEFAULT_ACCESSOR = {
  findBy: { id: uuid().required() },
}

function makeResolver(label: string, accessor: FindAccessor) {
  return async (runtime) => {
    const { params } = runtime

    // @todo allow more findBy types
    // const findParamName = findBy
    //   .map((f, i) => (i === 0 ? f : titleize(f)))
    //   .join("Or")
    return cypherFind(label, params.id)
  }
}

export function findEndpoints(
  label,
  accessor: boolean | FindAccessor,
  fields: Fields
): Reducible {
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
