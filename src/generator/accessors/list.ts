import pluralize from "pluralize"
// import { cypher } from "../../cypher"
// import { coerce } from "../../util/coercion"
// import { queryBuilder } from "../util"
import { listResolver } from "../../resolvers"
import { ConfigFields } from "../../server/types"

// const DEFAULT_OPTS = {
//   find: ["id"],
// }

// function standardizeOpts(opts): ResolverListQueryOpts {
//   // return Object.assign({}, DEFAULT_OPTS, typeof opts === "boolean" ? {} : opts)
//   return {}
// }

type ResolverListQueryOpts = {
  find?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
  search?: string[]
}

const DEFAULT_OPTS = {}

function makeSchema(label, def, fields: ConfigFields) {
  const name = `List${pluralize(label)}`

  return {
    name,
    definition: `${name}(
  limit: Int, 
  skip: Int, 
  order: String
): [${label}]!`,
  }
}

function makeResolver(
  label: string,
  opts: boolean | ResolverListQueryOpts = {}
) {
  const standardizedOpts = {
    label,
    ...DEFAULT_OPTS,
    ...(typeof opts === "boolean" ? {} : opts),
  }

  return listResolver(standardizedOpts)
}

export function generateList(label, definition, fields: ConfigFields) {
  const schema = makeSchema(label, definition, fields)
  const resolver = makeResolver(label, definition)

  return {
    schema,
    // resolver,
    resolvers: {
      [`List${pluralize(label)}`]: resolver,
    },
  }
}
