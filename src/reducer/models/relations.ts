import { relationResolver, resolveNode, resolveRel } from "../../resolvers"
import { Reducible, Relation } from "~/types"

export function generateObjectRelation(
  // name: string,
  definition: Relation
) {
  const { to, singular } = definition

  return {
    // returns: to.label,
    returns: `${singular ? to.label : `[${to.label}]!`}`,
    resolver: relationResolver(definition),
  }
}
