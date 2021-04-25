import { Cypher1Response, CypherCreateOpts } from "../types"
import { paramify } from "./util/params"

const DEFAULT_CREATE_OPTS = {
  id: true,
  timestamps: true,
}

export async function cypherCreate(
  label: string,
  params: object,
  opts: CypherCreateOpts = {}
): Promise<Cypher1Response> {
  const toParams = {
    ...params,
  }

  const paramsCypher = paramify(toParams, {
    ...DEFAULT_CREATE_OPTS,
    ...opts,
  })

  const node = await this.exec1(
    ` 
      CREATE (node:${label} { ${paramsCypher} })
      RETURN node;
    `
  ).then((res) => res?.node)

  // if (opts.after) await opts.after(node)

  return node
}
