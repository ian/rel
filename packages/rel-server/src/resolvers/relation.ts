import { Context, Relation } from "../types"

export default function relationResolver(parsedRelation: Relation) {
  const { relation } = parsedRelation
  const { label, direction, type } = relation

  return async (obj, args, context: Context, info) => {
    const { where, skip, limit } = args
    const { cypher } = context

    return cypher.listRelationship(
      cypher.ref(obj),
      { __typename: label, __direction: direction },
      type,
      args
    )
  }
}
