import { Fields } from "../types"

type Opts = {
  optional?: boolean
}

export function fieldsToComposer(fields: Fields, opts: Opts = {}): Fields {
  const { optional = false } = opts
  return Object.values(fields).reduce((acc, fieldGroup) => {
    const { name, type } = fieldGroup
    acc[name] = optional ? type.replace("!", "") : type // Make the field not required
    return acc
  }, {})
}
