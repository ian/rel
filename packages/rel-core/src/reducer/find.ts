import { Reducible, FindAccessor, Fields, ENDPOINTS } from "../types"
import Property from "../property"
import { findResolver } from "../resolvers"
import _ from "lodash"

const { uuid, type } = Property.Fields

const DEFAULT_ACCESSOR = {
  findBy: { id: uuid() },
}

function makeResolver(label: string, accessor: FindAccessor) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    accessor
  )
  return findResolver(label, standardizedOpts)
}

export function generateFind(
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
    endpoints: {
      [`Find${label}`]: {
        target: ENDPOINTS.ACCESSOR,
        params: findBy,
        guard,
        returns: type(label),
        resolver: makeResolver(label, _accessor),
      },
    },
  }
}
