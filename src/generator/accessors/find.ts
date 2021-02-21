import { Fields, Runtime } from "~/types"
import { findResolver } from "../../resolvers"
import { string } from "../../fields"

type ResolverFindQueryOpts = {
  findBy?: string[]
  // geo?: boolean
  where?: string
  only?: string[]
}

const DEFAULT_OPTS = {
  findBy: ["id"],
}

function makeResolver(
  label: string,
  opts: boolean | ResolverFindQueryOpts = {}
) {
  const standardizedOpts = Object.assign(
    {
      label,
    },
    DEFAULT_OPTS,
    typeof opts === "boolean" ? {} : opts
  )
  return findResolver(standardizedOpts)
}

export function generateFind(label, definition, fields: Fields): Runtime {
  const name = `Find${label}`
  return {
    // schema: {
    //   types: {
    //     Query: {
    //       [`${name}(id: UUID!)`]: label,
    //     },
    //   },
    // },
    types: {
      Query: {
        FindRestaurants: {
          params: { id: string() },
          returns: label,
        },
      },
    },
    resolvers: {
      Query: {
        [name]: makeResolver(label, definition),
      },
    },
  }
}
