import { cypher1 } from "./cypher"
import { isSlugAvailable, slugHandler } from "./slugs"
// import { slugify } from "../util/slugs"
import { geoify } from "../util/geo"
import { paramify, TIMESTAMPS } from "../util/params"

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
  slug?: string | SlugOpts
}

const DEFAULT_CREATE_OPTS = {
  id: true,
  timestamps: true,
}

export async function cypherCreate(label, params, opts: CreateOpts = {}) {
  const toParams = {
    ...params,
  }

  // always trim slugs
  if (toParams.slug) {
    Object.assign(toParams, {
      slug: toParams.slug.trim(),
    })
  }

  if (params.slug) {
    if (!(await isSlugAvailable(label, params.slug)))
      throw new Error("Slug already taken")
  } else if (opts.slug) {
    Object.assign(toParams, {
      slug: await slugHandler(opts.slug, label, params),
    })
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
