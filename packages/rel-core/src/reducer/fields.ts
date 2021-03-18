import { Fields, Output } from "../types"

// type Opts = {
//   guards?: boolean
// }

export function reduceFields(
  label: string,
  fields: Fields
  // opts: Opts = {}
): Output {
  // const { guards = true } = opts
  const gqlFields = {}

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj

    gqlFields[name] = {
      returns: def,
      resolver: async ({ obj }) => {
        return def._resolver ? def._resolver(obj) : obj[name]
      },
    }
  })

  return gqlFields
}
