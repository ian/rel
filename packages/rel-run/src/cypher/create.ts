import { Cypher1Response } from "@reldb/types"
import { cypher1 } from "./cypher"
import { paramify } from "../util/params"

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
    // id: true,
    // timestamps: true,
    ...DEFAULT_CREATE_OPTS,
    ...opts,
  })

  const node = await cypher1(
    ` 
      CREATE (node:${label} { ${paramsCypher} })
      RETURN node;
    `
  ).then((res) => res?.node)

  // if (opts.after) await opts.after(node)

  return node
}
