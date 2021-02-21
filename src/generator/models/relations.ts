import { relationResolver, resolveNode, resolveRel } from "../../resolvers"
import { Direction, Relation } from "~/types"

export function generateObjectRelation(name: string, definition: Relation) {
  const { from, to, rel, order = "to.id", direction, singular } = definition

  return {
    name,
    schema: `${singular ? to.label : `[${to.label}]!`}`,
    resolver: relationResolver(definition),
  }
}
