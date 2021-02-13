import titleize from "titleize"
import { cypher, cypher1, queryBuilder } from "../cypher"
import { coerce } from "../util/coercion"

type FindOpts = {
  label: string
  findBy?: string[]
  where?: string
}

export function findResolver(opts: FindOpts) {
  const {
    label,
    findBy,
    where,
    // only,
  } = opts

  const findParamName = findBy
    .map((f, i) => (i === 0 ? f : titleize(f)))
    .join("Or")

  return async (obj, params, context) => {
    // const { params } = runtime

    const cypherQuery = []
    cypherQuery.push(`MATCH (node:${label})`)

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

type ListOpts = {
  label: string
  findBy?: string[]
  where?: string
}

export function listResolver(opts: ListOpts) {
  const { label } = opts
  const defaultOrder = "id"

  return async (obj, params, context) => {
    const { limit, skip = 0, order = defaultOrder } = params
    const {
      // boundingBox,
      filter,
    } = params

    const cypherQuery = queryBuilder({
      match: `(node:${label})`,
      filter,
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
}
