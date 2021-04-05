import { Cypher1Response } from "../types"
import { paramify } from "./util/params"

export type SlugOpts = {
  from: string
  distinct?: boolean
}
// export type AfterOption = (obj: object) => Promise<void>

export type CreateOpts = {
  // after?: AfterOption
  id?: boolean
  timestamps?: boolean
}

const DEFAULT_CREATE_OPTS = {
  id: true,
  timestamps: true,
}

export async function cypherCreate(
  label,
  params,
  opts: CreateOpts = {}
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
