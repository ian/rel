import { Fields, ReducedType } from "~/types"

// type Opts = {
//   guards?: boolean
// }

export function generateFields(
  fields: Fields
  // opts: Opts = {}
): ReducedType {
  // const { guards = true } = opts
  const gqlFields = {}

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj

    // const fieldDef = [def._gqlName]
    // if (def._required) fieldDef.push("!")
    // if (guards && def._guard) fieldDef.push(` @${def._guard}`)

    // gqlFields[name] = fieldDef.join("")

    gqlFields[name] = {
      returns: def,
    }
  })

  return gqlFields
}
