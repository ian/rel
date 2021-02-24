import pluralize from "pluralize"
import { int, array, type, string } from "~/fields"
import { listResolver } from "~/resolvers"
import { ListAccessor, Reducible } from "~/types"

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
  const _type = {
    params: { limit: int(), skip: int(), order: string() },
    returns: array(type(label)).required(),
  }
  const resolver = makeResolver(label, _accessor)

  return {
    types: {
      Query: {
        [name]: _type,
      },
    },
    resolvers: {
      Query: {
        [name]: resolver,
      },
    },
  }
}
