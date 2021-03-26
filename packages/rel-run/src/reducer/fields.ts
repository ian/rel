import { Fields, Output } from "@reldb/types"

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
      resolver: async (runtime) => {
        const { obj } = runtime
        return def._resolver ? def._resolver(runtime) : obj[name]
      },
    }
  })

  return gqlFields
}
