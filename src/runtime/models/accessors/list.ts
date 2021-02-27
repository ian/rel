import pluralize from "pluralize"
import { int, array, type, string } from "~/fields"
import { listResolver } from "~/resolvers"
import { ListAccessor, Reducible, ReducedField } from "~/types"

const DEFAULT_ACCESSOR = {}

function makeResolver(label: string, accessor: ListAccessor) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    accessor
  )

  return listResolver(standardizedOpts)
}

function makeType(label: string, accessor: ListAccessor): ReducedField {
  const { guard } = accessor

  return {
    typeDef: {
      params: { limit: int(), skip: int(), order: string() },
      guard,
      returns: array(type(label)).required(),
    },
  }
}

export function generateList(
  label: string,
  accessor: boolean | ListAccessor
  // fields: Fields
): Reducible {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const name = `List${pluralize(label)}`
  const resolver = makeResolver(label, _accessor)

  return {
    types: {
      Query: {
        [name]: makeType(label, _accessor),
      },
    },
    resolvers: {
      Query: {
        [name]: resolver,
      },
    },
  }
}
