import titleize from "titleize"
import { cypher1 } from "../cypher"
import { coerce } from "../util/coercion"

export function findResolver(opts) {
  const {
    findBy,
    where,
    // only,
  } = opts

  const findParamName = findBy
    .map((f, i) => (i === 0 ? f : titleize(f)))
    .join("Or")

  return async function (runtime) {
    const { params } = runtime

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
}
