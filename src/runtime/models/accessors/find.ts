import { Reducible, ReducedField, ReducedType, FindAccessor } from "~/types"
import { uuid, type } from "~/fields"
import { findResolver } from "~/resolvers"
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

function makeType(label: string, accessor: FindAccessor): ReducedField {
  const { findBy, guard } = accessor

  return {
    params: findBy,
    guard,
    returns: type(label),
  }
}

export function generateFind(
  label,
  accessor: boolean | FindAccessor
  // fields: Fields
): Reducible {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const name = `Find${label}`

  return {
    types: {
      Query: {
        [name]: makeType(label, _accessor),
      },
    },
    resolvers: {
      Query: {
        [name]: makeResolver(label, _accessor),
      },
    },
  }
}
