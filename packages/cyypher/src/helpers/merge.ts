import { v4 as uuid } from "uuid"
import { paramify, setify } from "../util/params.js"
import cleanPrefix from "../util/cleanPrefix.js"
import { Node } from "src/types.js"

const DEFAULT_CREATE_OPTS = {
  id: true,
}

const DEFAULT_UPDATE_OPTS = {
  id: false,
}

export async function cypherMerge(
  label: string,
  matchParams: Record<string, unknown>,
  updateParams: Record<string, unknown>,
  projection = [],
  opts = {}
): Promise<Node> {
  const matchCypher = paramify(matchParams, opts)
  const createCypher = setify(
    {
      id: uuid(),
      createdAt: new Date().toISOString(),
      ...matchParams,
      ...updateParams,
    },
    {
      ...DEFAULT_CREATE_OPTS,
      ...opts,
      prefix: "node.",
    }
  )
  const updateCypher = setify(
    { updatedAt: new Date().toISOString(), ...updateParams },
    {
      ...DEFAULT_UPDATE_OPTS,
      ...opts,
      prefix: "node.",
    }
  )

  const res = await this.exec1(
    ` 
      MERGE (node:${label} { ${matchCypher} })
      ON CREATE SET ${createCypher}
      ON MATCH SET ${updateCypher}
      RETURN ${
        projection.length > 0
          ? projection.reduce(
              (previous, current, idx, arr) =>
                previous +
                `node.${current}${idx === arr.length - 1 ? "" : ","}`,
              ""
            )
          : "node"
      }
      LIMIT 1
    `
  )

  // if (opts.after) await opts.after(node)

  return projection.length > 0 ? cleanPrefix(res, "node.") : res?.node
}
