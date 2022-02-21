import { diff } from "../util/object.js"
import { paramify } from "../util/params.js"
import cleanPrefix from "../util/cleanPrefix.js"
import { Node } from "../types.js"
import buildWhereQuery from "../util/buildWhereQuery.js"

export async function cypherUpdate(
  label: string,
  where: object,
  params: Record<string, unknown>,
  projection = [],
  opts = {}
): Promise<Node> {
  const toParams = diff({}, params, {
    ignore: ["id", "createdAt", "updatedAt", "__typename"],
  })

  const paramsCypher = paramify(
    {
      updatedAt: new Date().toISOString(),
      ...toParams,
    },
    {
      ...opts,
      prefix: "node.",
      separator: "=",
    }
  )

  const query = []
  query.push(`MATCH (node:${label})`)

  // if (params.__unique) {
  //   query.push(
  //     `OPTIONAL MATCH (unique_node:${label} { __unique: "${params.__unique}"}) WITH unique_node WHERE unique_node IS NULL `
  //   )
  // }

  if (typeof where === "object" && Object.keys(where).length > 0) {
    query.push(`WHERE ${buildWhereQuery(where, { prefix: "node." })}`)
  }

  query.push(`SET ${paramsCypher}`)
  query.push(
    `RETURN ${
      projection.length > 0
        ? projection.reduce(
            (previous, current, idx, arr) =>
              previous + `node.${current}${idx === arr.length - 1 ? "" : ","}`,
            ""
          )
        : "node"
    }`
  )
  query.push("LIMIT 1")

  const res = await this.exec1(query.join(`\n`))

  if (!res)
    throw new Error(
      `${label} not found${
        params.__unique ? " or UNIQUE constraint violated" : ""
      }`
    )

  return projection.length > 0 ? cleanPrefix(res, "node.") : res?.node
}
