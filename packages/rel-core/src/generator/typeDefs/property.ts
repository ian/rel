import { ReducedProperty, Params, FieldToGQLOpts } from "../../types"

type Opts = FieldToGQLOpts

function generateParams(params: Params, opts: Opts = {}) {
  return Object.entries(params)
    .map((entry) => {
      const [name, field] = entry
      return `${name}: ${field.toGQL(opts)}`
    })
    .join(", ")
}

export function generateProperty(
  name,
  property: ReducedProperty,
  opts: Opts = {}
) {
  const { guards = true } = opts
  const fieldDef = [name]
  const { guard, params, returns } = property.typeDef

  if (params) {
    fieldDef.push(`( ${generateParams(params, opts)} )`)
  }
  fieldDef.push(": ")
  fieldDef.push(returns.toGQL(opts))
  if (guards && guard) fieldDef.push(` @${guard}`)

  return fieldDef.join("")
}
