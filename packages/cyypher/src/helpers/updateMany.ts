import { diff } from "../util/object.js"
import { paramify } from "../util/params.js"
import cleanPrefix from "../util/cleanPrefix.js"
import buildWhereQuery from "../util/buildWhereQuery.js"
import { Node } from "src/types.js"

export async function cypherUpdateMany(
  label: string,
  where: object,
  params: Record<string, unknown>,
  projection = [],
  opts = {}
): Promise<Node[]> {
  const toParams = diff({}, params, {
    ignore: ["id", "createdAt", "updatedAt", "__typename"],
  })

  const paramsCypher = paramify(
    { updatedAt: new Date().toISOString(), ...toParams },
    {
      ...opts,
      prefix: "node.",
      separator: "=",
    }
  )

  const query = []
  query.push(`MATCH (node:${label})`)

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

  const res = await this.exec(query.join(`\n`))

  return projection.length > 0
    ? cleanPrefix(res, "node.")
    : res.map((x) => x.node)
}
