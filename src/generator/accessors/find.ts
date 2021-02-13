import { Fields } from "../../types"
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

function convertToResoverFindQuery(
  name: string,
  opts: boolean | ResolverFindQueryOpts = {}
) {
  const standardizedOpts = Object.assign(
    {},
    DEFAULT_OPTS,
    typeof opts === "boolean" ? {} : opts
  )
  const handler = findResolver(standardizedOpts)

  return {
    name: `Find${name}`,
    handler,
  }
}

function convertToSchemaFindQuery(label, def, fields: Fields) {
  // Author(id: UUID!): Author
  const name = `Find${label}`

  return {
    name,
    definition: `${name}(id: UUID!): ${label}`,
  }
}

export function generateFind(label, definition, fields: Fields) {
  const schema = convertToSchemaFindQuery(label, definition, fields)
  const resolver = convertToResoverFindQuery(label, definition)

  return {
    schema,
    resolver,
  }
}
