import toSlug from "slugify"
import String from "./string"

type Opts = {
  from: string
}

export default class Slug extends String {
  constructor(opts: Opts) {
    super()
    if (!opts?.from) {
      throw new Error('slug() requires { from: "..." } param')
    }

    this.default(async (runtime) => {
      const { label, fieldName, values, cypher } = runtime

      if (values[fieldName]) {
        const slug = values[fieldName].slug.trim()
        const slugAvailable = await isSlugAvailable(cypher, label, slug)
        if (!slugAvailable) {
          throw new Error(`${label} slug "${slug}" is already taken`)
        }
      } else {
        return findNextAvailableSlug(cypher, label, slugify(values[opts.from]))
      }
    })
  }
}

async function findNextAvailableSlug(cypher, label, slugBase, tries = 0) {
  const taken = await cypher
    .exec1(`MATCH (n:${label}) WHERE n.slug =~ '${slugBase}-?.*' RETURN n`)
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
