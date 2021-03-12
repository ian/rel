import { Cypher1Response } from "../types"
import { cypher1 } from "./cypher"
import { geoify } from "../util/geo"
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
  geo?: string | ((object) => string)
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

  if (opts.geo) {
    const address =
      typeof opts.geo === "function" ? opts.geo(params) : params[opts.geo]
    if (address) {
      Object.assign(toParams, await geoify(address))
    }
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
