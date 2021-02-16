import { isEmpty } from "lodash"
import { cypher1 } from "./cypher"
import { cypherFind } from "./find"
import { isSlugAvailable, slugHandler } from "./slugs"
// import { slugify } from "../util/slugs"
// import { geoify } from "../util/geo"
import { diff } from "../util/compare"
import { paramify, TIMESTAMPS } from "../util/params"

// export type SlugOpts = {
//   from: string
//   distinct?: boolean
// }
// export type AfterOption = (obj: object) => Promise<void>

export type UpdateOpts = {
  // after?: AfterOption
  // geo?: string | ((object) => string)
  // slug?: string | SlugOpts
}

export async function cypherUpdate(label, id, params, opts: UpdateOpts = {}) {
  const node = await cypherFind(label, id)

  if (!node) {
    throw new Error(`Unknown ${label} id = ${id}`)
  }

  const { id: _, createdAt, updatedAt, ...toParams } = diff(node, params, {
    ignore: ["id", "createdAt", "updatedAt", "__typename"],
  })

  // always trim slugs
  // if (toParams.slug) {
  //   if (!(await isSlugAvailable(label, params.slug)))
  //     throw new Error("Slug already taken")

  //   Object.assign(toParams, {
  //     slug: toParams.slug.trim(),
  //   })
  // }

  // if (opts.geo) {
  //   const address =
  //     typeof opts.geo === "function" ? opts.geo(params) : params[opts.geo]
  //   if (address) {
  //     Object.assign(toParams, { ...(await geoify(address)) })
  //   }
  // }

  if (isEmpty(toParams)) {
    // no changes necessary, just return the object
    return node
  }

  const paramsCypher = paramify(toParams, {
    id: false,
    timestamps: TIMESTAMPS.UPDATED,
    ...opts,
  })

  const res = await cypher1(
    `
      MATCH (node:${label} { ${paramify({ id })} })
      SET node += { ${paramsCypher} }
      RETURN node;
    `
  )

  if (!res) throw new Error(`${label} not found`)
  return res.node
}
