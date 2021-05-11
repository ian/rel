import toSlug from "slugify"
import String from "./string"

type Opts = {
  from: string
}

export default class Slug extends String {
  constructor(slugOpts: Opts) {
    super()
    if (!slugOpts?.from) {
      throw new Error('slug() requires { from: "..." } param')
    }

    this.default(async (obj, params, context, info, opts) => {
      const { cypher } = context
      const { modelName, fieldName } = opts

      if (obj[fieldName]) {
        const slug = obj[fieldName].slug.trim()
        const slugAvailable = await isSlugAvailable(cypher, modelName, slug)
        if (!slugAvailable) {
          throw new Error(`${modelName} slug "${slug}" is already taken`)
        }
      } else {
        const slug = await findNextAvailableSlug(
          cypher,
          modelName,
          slugify(obj[slugOpts.from])
        )

        return slug
      }
    })
  }
}

async function findNextAvailableSlug(cypher, label, slugBase, tries = 0) {
  const taken = await cypher
    .exec1(`MATCH (n:${label}) WHERE n.slug STARTS WITH '${slugBase}' RETURN n`)
    .then((res) => res?.n.slug)

  if (taken) {
    const tokens = makeTries(slugBase, tries)
    const avail = tokens.find((tok) => !taken.includes(tok))
    if (avail) {
      return avail
    }
    return findNextAvailableSlug(cypher, label, slugBase, tries + 1)
  } else {
    return slugBase // requested slug is available
  }
}

const PER_PAGE = 10

function makeTries(slugBase, tries = 0) {
  return [...Array(PER_PAGE)].map(
    (_, i) =>
      `${slugBase}${tries === 0 && i === 0 ? "" : `-${tries * PER_PAGE + i}`}`
  )
}

async function isSlugAvailable(cypher1, label, slug) {
  const res = await cypher1(
    `MATCH (n:${label}) WHERE n.slug = "${slug}" RETURN n`
  )
  return !res
}

function slugify(str: string) {
  return toSlug(str?.trim(), {
    lower: true,
    strict: true,
  })
}
