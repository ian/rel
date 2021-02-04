import titleize from "titleize"
import { cypher1 } from "../cypher"
import { coerce } from "../util/coercion"

type ResolverFindQueryOpts = {
  find?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
}

const DEFAULT_OPTS = {
  find: ["id"],
}

function standardizeOpts(opts): ResolverFindQueryOpts {
  return Object.assign({}, DEFAULT_OPTS, typeof opts === "boolean" ? {} : opts)
}

export function convertToResoverFindQuery(
  name: string,
  opts: boolean | ResolverFindQueryOpts = {}
) {
  const {
    find,
    where,
    // only,
  } = standardizeOpts(opts)

  const findBy = find
  const findParamName = findBy
    .map((f, i) => (i === 0 ? f : titleize(f)))
    .join("Or")

  const handler = async function (_, params) {
    const cypherQuery = []
    cypherQuery.push(`MATCH (node:${name})`)

    if (params[findParamName]) {
      const where = findBy
        .map((f) => `node.${f} = ${coerce(params[findParamName])}`)
        .join(" OR ")
      cypherQuery.push(`WHERE (${where})`)
    }

    if (where) cypherQuery.push(`AND ${where}`)

    cypherQuery.push(`RETURN node`)
    cypherQuery.push(`LIMIT 1;`)

    return cypher1(cypherQuery.join("\n")).then((res) => res?.node)
  }

  return {
    name: `Find${name}`,
    handler,
  }
}
