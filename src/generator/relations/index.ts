import { relationResolver, resolveNode, resolveRel } from "../../resolvers"
import { Direction, ConfigRelation } from "../../server/types"

export function generateObjectRelation(
  name: string,
  definition: ConfigRelation
) {
  const { from, to, rel, order = "to.id", direction, singular } = definition

  return {
    name,
    schema: `${singular ? to.label : `[${to.label}]!`}`,
    resolver: relationResolver(definition),
  }
}
