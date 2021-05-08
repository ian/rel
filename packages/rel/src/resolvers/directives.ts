import { Reduced } from "../types"
import { ResolverOpts } from "./index"

export function generateDirectiveResolvers(
  reduced: Reduced,
  opts: ResolverOpts
) {
  const { cypher } = opts
  return Object.entries(reduced.directives).reduce((acc, dir) => {
    const [name, { resolver }] = dir
    acc[name] = (runtime) => resolver({ cypher, ...runtime })
    return acc
  }, {})
}
