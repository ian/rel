import { Fields, ReducedType } from "../../types"

// type Opts = {
//   guards?: boolean
// }

export function reduceFields(
  fields: Fields
  // opts: Opts = {}
): ReducedType {
  // const { guards = true } = opts
  const gqlFields = {}

  Object.entries(fields).forEach((fieldObj) => {
    const [name, def] = fieldObj

    gqlFields[name] = {
      typeDef: {
        returns: def,
      },
    }
  })

  return gqlFields
}
