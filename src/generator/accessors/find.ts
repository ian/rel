import { ConfigFields } from "../../server/types"
import { findResolver } from "../../resolvers"

type ResolverFindQueryOpts = {
  findBy?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
}

const DEFAULT_OPTS = {
  findBy: ["id"],
}

function makeResolver(
  label: string,
  opts: boolean | ResolverFindQueryOpts = {}
) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    DEFAULT_OPTS,
    typeof opts === "boolean" ? {} : opts
  )
  return findResolver(standardizedOpts)
}

export function generateFind(label, definition, fields: ConfigFields) {
  const name = `Find${label}`
  return {
    schema: {
      Query: {
        [`${name}(id: UUID!)`]: label,
      },
    },
    resolvers: {
      [name]: makeResolver(label, definition),
    },
  }
}
