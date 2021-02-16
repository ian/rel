import { Fields, Resolver } from "../types"
import { findResolver } from "../../resolvers"

const DEFAULT_OPTS = {
  findBy: ["id"],
}
const DEFAULT_RESOLVER = {}

function makeResolver(label: string, resolver: Resolver) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    DEFAULT_OPTS,
    typeof resolver === "boolean" ? DEFAULT_RESOLVER : resolver
  )
  return findResolver(standardizedOpts)
}

export function generateUpdate(label, definition, fields: Fields) {
  return {}

  // const name = `Find${label}`
  // return {
  //   schema: {
  //     Query: {
  //       [`${name}(id: UUID!)`]: label,
  //     },
  //   },
  //   resolvers: {
  //     Query: {
  //       [name]: makeResolver(label, definition),
  //     },
  //   },
  // }
}
