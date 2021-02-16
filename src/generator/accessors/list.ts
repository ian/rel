import pluralize from "pluralize"
import { listResolver } from "../../resolvers"
import { Fields } from "../types"

type ResolverListQueryOpts = {
  find?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
  search?: string[]
}

const DEFAULT_OPTS = {}

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

export function generateList(label, definition, fields: Fields) {
  const name = `List${pluralize(label)}`
  const gqlName = `List${pluralize(label)}(
    limit: Int, 
    skip: Int, 
    order: String
  )`
  const gqlDef = `[${label}]!`

  // const schema = makeSchema(label, definition, fields)
  const resolver = makeResolver(label, definition)

  return {
    schema: {
      Query: {
        [gqlName]: gqlDef,
      },
    },
    // resolver,
    resolvers: {
      Query: {
        [name]: resolver,
      },
    },
  }
}
