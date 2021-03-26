import toSlug from "slugify"
import String from "./string"

// import { isSlugAvailable, slugHandler } from "../../cypher/slugs"

type Opts = {
  from: string
}

export default class Slug extends String {
  constructor(opts: Opts) {
    super()
    const { from } = opts

    this.default(async (runtime) => {
      const { label, fieldName, values, cypher1 } = runtime

      const findAvailableSlug = async (label, slugBase, tries = 0) => {
        const trySlug = tries === 0 ? slugBase : `${slugBase}-${tries}`
        if (await isSlugAvailable(label, trySlug)) return trySlug
        return findAvailableSlug(label, slugBase, tries + 1)
      }

      const isSlugAvailable = async (label, slug) => {
        const res = await cypher1(
          `MATCH (n:${label}) WHERE n.slug = "${slug}" RETURN n`
        )
        return !res
      }

      let slug

      if (values[fieldName]) {
        slug = values[fieldName].slug.trim()
        const slugAvailable = await isSlugAvailable(label, slug)
        if (!slugAvailable) {
          throw new Error(`${label} slug "${slug}" is already taken`)
        }
      } else {
        slug = await findAvailableSlug(label, slugify(values[from]))
      }

      return slug
    })
  }
}

function slugify(str: string) {
  return toSlug(str?.trim(), {
    lower: true,
    strict: true,
  })
}
