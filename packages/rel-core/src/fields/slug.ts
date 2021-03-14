import String from "./string"
import { isSlugAvailable, slugHandler } from "../cypher/slugs"

type Opts = {
  from: string
}

export default class Slug extends String {
  _from = null

  constructor(opts: Opts) {
    super()
    const { from } = opts
    this._from = from

    this.default(async (label, fieldName, values) => {
      let slug

      if (values[fieldName]) {
        slug = values[fieldName].slug.trim()
        const slugAvailable = await isSlugAvailable(label, slug)
        if (!slugAvailable) {
          throw new Error(`${label} slug "${slug}" is already taken`)
        }
      } else {
        slug = await slugHandler(label, values[this._from])
      }

      return slug
    })
  }
}
