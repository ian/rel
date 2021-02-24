import pluralize from "pluralize"
import { array, type } from "~/fields"
import { listResolver } from "~/resolvers"
import { Fields, Reducible } from "~/types"

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

export function generateList(
  label: string,
  definition,
  fields: Fields
): Reducible {
  const name = `List${pluralize(label)}`
  const gqlName = `List${pluralize(label)}(
    limit: Int, 
    skip: Int, 
    order: String
  )`
  const _type = {
    returns: array(type(label)).required(),
  }
  const resolver = makeResolver(label, definition)

  return {
    types: {
      Query: {
        [gqlName]: _type,
      },
    },
    resolvers: {
      Query: {
        [name]: resolver,
      },
    },
  }
}
