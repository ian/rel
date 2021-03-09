import toSlug from "slugify"
import { cypher1 } from "."

export async function findAvailableSlug(label, slugBase, tries = 0) {
  const trySlug = tries === 0 ? slugBase : `${slugBase}-${tries}`
  if (isSlugAvailable(label, trySlug)) return trySlug
  return findAvailableSlug(label, slugBase, tries + 1)
}

export async function isSlugAvailable(label, slug) {
  const res = await cypher1(
    `MATCH (n:${label}) WHERE n.slug = "${slug}" RETURN n`
  )
  return !res
}

export function slugify(str: string) {
  return toSlug(str?.trim(), {
    lower: true,
    strict: true,
  })
}

export async function slugHandler(opts, label, params) {
  if (typeof opts === "object" && !opts.distinct) {
    return slugify(params[opts.from])
  }
  return await findAvailableSlug(label, slugify(params[opts]))
}
