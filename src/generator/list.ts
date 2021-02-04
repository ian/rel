import pluralize from "pluralize"
import { cypher } from "../cypher"
// import { coerce } from "../../util/coercion"
import { queryBuilder } from "./util"

import { Fields } from "./fields"

// const DEFAULT_OPTS = {
//   find: ["id"],
// }

function standardizeOpts(opts): ResolverListQueryOpts {
  // return Object.assign({}, DEFAULT_OPTS, typeof opts === "boolean" ? {} : opts)
  return {}
}

type ResolverListQueryOpts = {
  find?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
  search?: string[]
}

export function convertToSchemaListQuery(label, def, fields: Fields) {
  const name = `List${pluralize(label)}`

  return {
    name,
    definition: `${name}(limit: Int, skip: Int, order: String): [${label}]!`,
  }
}

export function convertToResoverListQuery(
  label: string,
  opts: boolean | ResolverListQueryOpts = {}
) {
  const {
    // find,
    // where,
    // only,
  } = standardizeOpts(opts)
  const defaultOrder = "id"

  const handler = async function (obj, params, context) {
    const { limit, skip = 0, order = defaultOrder } = params
    const {
      // boundingBox,
      //search,
      filter,
    } = params

    const cypherQuery = queryBuilder({
      match: `(node:${label})`,
      filter,
      // search: {
      //   query: search,
      //   fields: opts.search,
      // },
      // geo: {
      //   boundingBox,
      // },
      limit,
      skip,
      order,
    })

    return cypher(cypherQuery).then((res) =>
      //@ts-ignore
      res.map((res) => res.node)
    )
  }

  return {
    name: `List${pluralize(label)}`,
    handler,
  }
}