import { Fields } from "~/types"

type Opts = {
  guards?: boolean
}

export function generateFields(fields: Fields, opts: Opts = {}) {
  const { guards = true } = opts
  const gqlFields = {}

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj
    gqlFields[name] = def.toGQL({ guards })
  })

  return gqlFields
}
