import { Reducible, TypeDef, FindAccessor, Fields, ENDPOINTS } from "../types"
import { uuid, type } from "../fields"
import { findResolver } from "../resolvers"
import _ from "lodash"

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

function makeType(label: string, accessor: FindAccessor): TypeDef {
  const { findBy, guard } = accessor

  return {
    params: findBy,
    guard,
    returns: type(label),
  }
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

  return {
    endpoints: {
      [`Find${label}`]: {
        target: ENDPOINTS.ACCESSOR,
        typeDef: makeType(label, _accessor),
        resolver: makeResolver(label, _accessor),
      },
    },
  }
}
