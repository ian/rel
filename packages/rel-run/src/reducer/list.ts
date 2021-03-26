import pluralize from "pluralize"
import { int, array, type, string } from "@reldb/meta"
import { listResolver } from "../resolvers"
import { ListAccessor, Reducible, ENDPOINTS, Fields } from "@reldb/types"

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
  accessor: boolean | ListAccessor,
  fields: Fields
): Reducible {
  if (!accessor) return null

  let _accessor = {
    ...DEFAULT_ACCESSOR,
    ...(typeof accessor === "boolean" ? {} : accessor),
  }

  const { guard } = _accessor

  return {
    endpoints: {
      [`List${pluralize(label)}`]: {
        target: ENDPOINTS.ACCESSOR,
        params: { limit: int(), skip: int(), order: string() },
        guard,
        returns: array(type(label)).required(),
        resolver: makeResolver(label, _accessor),
      },
    },
  }
}
